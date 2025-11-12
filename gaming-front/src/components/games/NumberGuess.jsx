import React, { useState } from 'react';

export default function NumberGuess({ onBack }) {
  const [target] = useState(Math.floor(Math.random()*100)+1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Guess 1–100');
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);

  const handleGuess = () => {
    const num = parseInt(guess);
    if(isNaN(num) || num<1||num>100) return;
    setAttempts(a=>a+1);
    if(num===target){ setMessage(`🎉 Correct! Attempts: ${attempts+1}`); setWon(true); }
    else if(num<target) setMessage('📈 Too low!');
    else setMessage('📉 Too high!');
    setGuess('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Number Guess</h2>
      <div className="mb-2">{message}</div>
      {!won && <>
        <input type="number" value={guess} onChange={e=>setGuess(e.target.value)} className="border px-2 py-1 mb-2"/>
        <button onClick={handleGuess} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">Submit</button>
      </>}
      {won && <button onClick={()=>{setGuess('');setMessage('Guess 1–100');setAttempts(0);setWon(false)}} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">Play Again</button>}
      <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}
