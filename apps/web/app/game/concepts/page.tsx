import React from 'react';

export default function ConceptsGame() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Programming Concepts</h1>
          <p className="mt-2 text-gray-600">Learn programming concepts while improving your typing</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <div className="text-lg font-medium text-gray-900 mb-4">
              Question 1: What is the time complexity of binary search?
            </div>
            <div className="text-gray-600 mb-4">
              Type your answer below:
            </div>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Start typing your answer..."
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Score</div>
              <div className="text-2xl font-bold text-gray-900">0</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Questions</div>
              <div className="text-2xl font-bold text-gray-900">1/10</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Time</div>
              <div className="text-2xl font-bold text-gray-900">60s</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-sm text-gray-500 mb-2">Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '10%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 