import { useEffect, useCallback } from 'react';
import { useGame } from '../contexts/GameContext';

export function useGameLogic() {
  const { state, dispatch } = useGame();

  const calculateWPM = useCallback((totalKeystrokes: number, timeInMinutes: number) => {
    const words = totalKeystrokes / 5; // Average word length is 5 characters
    return Math.round(words / timeInMinutes);
  }, []);

  const calculateAccuracy = useCallback((errors: number, totalKeystrokes: number) => {
    if (totalKeystrokes === 0) return 100;
    return Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100);
  }, []);

  const startGame = useCallback(async (gameType: GameType) => {
    try {
      const response = await fetch('/api/game/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameType }),
      });

      const session = await response.json();
      dispatch({ type: 'START_GAME', payload: { sessionId: session.id, gameType } });
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  }, [dispatch]);

  const endGame = useCallback(async () => {
    if (!state.currentSession) return;

    try {
      await fetch(`/api/game/session/${state.currentSession.id}/end`, {
        method: 'POST',
      });

      await fetch('/api/game/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameSessionId: state.currentSession.id,
          wpm: state.wpm,
          accuracy: state.accuracy,
        }),
      });

      dispatch({ type: 'END_GAME' });
    } catch (error) {
      console.error('Failed to end game:', error);
    }
  }, [state.currentSession, state.wpm, state.accuracy, dispatch]);

  const handleKeystroke = useCallback(() => {
    dispatch({ type: 'INCREMENT_KEYSTROKES' });
  }, [dispatch]);

  const handleError = useCallback(() => {
    dispatch({ type: 'INCREMENT_ERRORS' });
  }, [dispatch]);

  // Update stats every second
  useEffect(() => {
    if (!state.isPlaying) return;

    const interval = setInterval(() => {
      const timeElapsed = (Date.now() - (state.currentSession?.startTime || 0)) / 1000 / 60; // in minutes
      const wpm = calculateWPM(state.totalKeystrokes, timeElapsed);
      const accuracy = calculateAccuracy(state.errors, state.totalKeystrokes);

      dispatch({ type: 'UPDATE_STATS', payload: { wpm, accuracy } });
      dispatch({ type: 'UPDATE_TIME', payload: Math.max(0, 60 - Math.floor(timeElapsed * 60)) });

      if (timeElapsed >= 1) {
        endGame();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    state.isPlaying,
    state.currentSession?.startTime,
    state.totalKeystrokes,
    state.errors,
    calculateWPM,
    calculateAccuracy,
    endGame,
    dispatch,
  ]);

  return {
    startGame,
    endGame,
    handleKeystroke,
    handleError,
    isPlaying: state.isPlaying,
    wpm: state.wpm,
    accuracy: state.accuracy,
    timeRemaining: state.timeRemaining,
  };
} 