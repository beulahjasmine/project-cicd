import React from 'react';
import { Play } from 'lucide-react';

const GameCard = ({ game, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-blue-600 transition-all transform hover:scale-105 cursor-pointer group shadow-sm hover:shadow-lg"
      onClick={onClick}
    >
      <div className="bg-blue-600 p-8 text-center">
        <div className="text-6xl mb-2">{game.icon}</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.name}</h3>
        <p className="text-gray-600 mb-4">{game.description}</p>
        <button className="w-full py-3 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-xl text-gray-700 font-semibold transition flex items-center justify-center gap-2 border border-gray-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
          <Play size={20} />
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard;