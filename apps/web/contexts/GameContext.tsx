import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameType } from '@typequest/db';

interface GameState {
  currentSession: {
    id: string;
    type: GameType;
    startTime: number;
  } | null;
  isPlaying: boolean;
  wpm: number;
  accuracy: number;
  timeRemaining: number;
  errors: number;
  totalKeystrokes: number;
}

type GameAction =
  | { type: 'START_GAME'; payload: { sessionId: string; gameType: GameType } }
  | { type: 'END_GAME' }
  | { type: 'UPDATE_STATS'; payload: { wpm: number; accuracy: number } }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'INCREMENT_ERRORS' }
  | { type: 'INCREMENT_KEYSTROKES' };

const initialState: GameState = {
  currentSession: null,
  isPlaying: false,
  wpm: 0,
  accuracy: 100,
  timeRemaining: 60,
  errors: 0,
  totalKeystrokes: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        currentSession: {
          id: action.payload.sessionId,
          type: action.payload.gameType,
          startTime: Date.now(),
        },
        isPlaying: true,
      };
    case 'END_GAME':
      return {
        ...state,
        isPlaying: false,
        currentSession: null,
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        wpm: action.payload.wpm,
        accuracy: action.payload.accuracy,
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        timeRemaining: action.payload,
      };
    case 'INCREMENT_ERRORS':
      return {
        ...state,
        errors: state.errors + 1,
      };
    case 'INCREMENT_KEYSTROKES':
      return {
        ...state,
        totalKeystrokes: state.totalKeystrokes + 1,
      };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 