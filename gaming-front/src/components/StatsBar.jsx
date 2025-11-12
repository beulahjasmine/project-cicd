import React from 'react';
import { Trophy, Star, Zap } from 'lucide-react';

export default function StatsBar({ totalGames }) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-12 max-w-7xl mx-auto px-8">
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="text-blue-600" size={24} />
          <span className="text-gray-600 font-medium">Total Games</span>
        </div>
        <div className="text-3xl font-bold text-gray-800">{totalGames}</div>
      </div>
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Star className="text-blue-600" size={24} />
          <span className="text-gray-600 font-medium">Featured</span>
        </div>
        <div className="text-3xl font-bold text-gray-800">New</div>
      </div>
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="text-blue-600" size={24} />
          <span className="text-gray-600 font-medium">Status</span>
        </div>
        <div className="text-3xl font-bold text-gray-800">Active</div>
      </div>
    </div>
  );
}
