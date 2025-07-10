import React from 'react';

export default function CodeTypingGame() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Code Typing Challenge</h1>
          <p className="mt-2 text-gray-600">Practice typing code snippets in various programming languages</p>
        </div>
        
        <div className="bg-[#1e1e1e] rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <select className="bg-gray-700 text-white px-3 py-2 rounded-md text-sm">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
            </select>
          </div>

          <div className="mb-6">
            <div className="text-gray-300 font-mono text-sm mb-4 whitespace-pre">
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`}
            </div>
            <textarea
              className="w-full h-32 bg-[#2d2d2d] text-gray-300 font-mono p-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Start typing the code..."
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-400">WPM</div>
              <div className="text-2xl font-bold text-white">0</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Accuracy</div>
              <div className="text-2xl font-bold text-white">0%</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Time</div>
              <div className="text-2xl font-bold text-white">60s</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 