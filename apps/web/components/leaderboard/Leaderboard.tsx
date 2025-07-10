import React, { useEffect, useState } from 'react';
import { GameType } from '@typequest/db';
import { Card, CardHeader, CardContent } from '@typequest/ui';

interface LeaderboardEntry {
  id: string;
  wpm: number;
  accuracy: number;
  user: {
    name: string;
    email: string;
  };
}

interface LeaderboardProps {
  gameType: GameType;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameType }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(`/api/game/leaderboard/${gameType}`);
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [gameType]);

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">{entry.user.name || entry.user.email}</div>
                  <div className="text-sm text-gray-500">
                    {entry.wpm} WPM • {entry.accuracy}% accuracy
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}; 