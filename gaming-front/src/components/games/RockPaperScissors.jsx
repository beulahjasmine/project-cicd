import React, { useState } from 'react';

export default function RockPaperScissors({ onBack }) {
  const choices = ['Rock','Paper','Scissors'];
  const [player, setPlayer] = useState('');
  const [computer, setComputer] = useState('');
  const [result, setResult] = useState('');

  const play = (p) => {
    const c = choices[Math.floor(Math.random()*3)];
    setPlayer(p); setComputer(c);
    if(p===c) setResult('Tie!');
    else if((p==='Rock' && c==='Scissors')||(p==='Paper' && c==='Rock')||(p==='Scissors' && c==='Paper')) setResult('You win!');
    else setResult('Computer wins!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Rock Paper Scissors</h2>
      <div className="mb-2">{result && `${player} vs ${computer} → ${result}`}</div>
      <div className="flex gap-2 mb-2">
        {choices.map(c=>(
          <button key={c} onClick={()=>play(c)} className="px-4 py-2 bg-blue-600 text-white rounded">{c}</button>
        ))}
      </div>
      <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}
