import React from 'react';
import { GameModeCard } from './GameModeCard';

const gameModes = [
  {
    title: 'Type Speed Challenge',
    description: 'Test your typing speed with random words and phrases.',
    difficulty: 'Easy' as const,
    href: '/game/speed',
  },
  {
    title: 'Code Typing',
    description: 'Practice typing code snippets in various programming languages.',
    difficulty: 'Medium' as const,
    href: '/game/code',
  },
  {
    title: 'Programming Concepts',
    description: 'Learn programming concepts while improving your typing.',
    difficulty: 'Hard' as const,
    href: '/game/concepts',
  },
];

export const GameModeList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {gameModes.map((mode) => (
        <GameModeCard
          key={mode.href}
          title={mode.title}
          description={mode.description}
          difficulty={mode.difficulty}
          href={mode.href}
        />
      ))}
    </div>
  );
}; 