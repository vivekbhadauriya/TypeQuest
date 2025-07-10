import React from 'react';
import Link from 'next/link';

interface GameModeCardProps {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  href: string;
}

export const GameModeCard: React.FC<GameModeCardProps> = ({
  title,
  description,
  difficulty,
  href,
}) => {
  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
  };

  return (
    <Link href={href}>
      <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
    </Link>
  );
}; 