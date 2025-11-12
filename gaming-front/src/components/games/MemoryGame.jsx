import React, { useState } from 'react';

export default function MemoryGame({ onBack }) {
  const emojis = ['🎮','🎯','🎲','🎪'];
  const [cards, setCards] = useState([...emojis, ...emojis].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleClick = (i) => {
    if (flipped.includes(i) || matched.includes(i)) return;
    const newFlipped = [...flipped, i];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
      }
      setTimeout(() => setFlipped([]), 800);
    }
  };

  const reset = () => {
    setCards([...emojis, ...emojis].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-4">Memory Match</h2>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((emoji, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-16 h-16 text-2xl border-2 border-gray-400 rounded"
          >
            {flipped.includes(i) || matched.includes(i) ? emoji : '?'}
          </button>
        ))}
      </div>
      <div className="mb-4">Matched: {matched.length/2}</div>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">Reset</button>
      <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}
