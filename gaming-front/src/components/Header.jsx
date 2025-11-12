import React from 'react';
import { Gamepad2 } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white border-b-2 border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center gap-4">
        <div className="p-3 bg-blue-600 rounded-2xl">
          <Gamepad2 className="text-white" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Gaming Portal</h1>
          <p className="text-gray-600">Choose your adventure</p>
        </div>
      </div>
    </div>
  );
}
