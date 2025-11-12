import React, { useState, useEffect } from 'react';

export default function WhackAMole({ onBack }) {
  const [active, setActive] = useState(-1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(Math.floor(Math.random()*9));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const hit = (i) => {
    if(i===active) setScore(s=>s+1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Whack-a-Mole</h2>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {Array.from({length:9}).map((_,i)=>(
          <div key={i} onClick={()=>hit(i)} className={`w-16 h-16 rounded ${active===i?'bg-green-600':'bg-gray-300'} cursor-pointer`}></div>
        ))}
      </div>
      <div className="mb-2">Score: {score}</div>
      <button onClick={()=>setScore(0)} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">Restart</button>
      <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}
