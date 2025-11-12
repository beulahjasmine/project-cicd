import React, { useState } from 'react';

export default function SimonSays({ onBack }) {
  const colors = ['red','blue','green','yellow'];
  const [sequence, setSequence] = useState([]);
  const [playerSeq, setPlayerSeq] = useState([]);
  const [round, setRound] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    const first = colors[Math.floor(Math.random()*4)];
    setSequence([first]); setPlayerSeq([]); setRound(1); setGameOver(false);
  };

  const handleClick = (color) => {
    if(gameOver) return;
    const newPlayerSeq = [...playerSeq, color];
    setPlayerSeq(newPlayerSeq);
    if(color!==sequence[newPlayerSeq.length-1]) setGameOver(true);
    else if(newPlayerSeq.length===sequence.length){
      const next = colors[Math.floor(Math.random()*4)];
      setSequence([...sequence,next]); setPlayerSeq([]); setRound(r=>r+1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Simon Says</h2>
      <div className="mb-2">Round: {round}</div>
      <div className="flex gap-2 mb-2">
        {colors.map(c=>(
          <button key={c} onClick={()=>handleClick(c)} className={`w-12 h-12 rounded ${c}-500 border border-gray-400`}></button>
        ))}
      </div>
      {gameOver && <div className="text-red-600 font-bold mb-2">Game Over!</div>}
           <button onClick={startGame} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">
        {gameOver ? 'Play Again' : 'Start Game'}
      </button>
      <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}

    
