import React from 'react';
import Link from 'next/link';

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-900">TypeQuest</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/game/speed"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Speed Test
              </Link>
              <Link
                href="/game/code"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Code Typing
              </Link>
              <Link
                href="/game/concepts"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Concepts
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
} 