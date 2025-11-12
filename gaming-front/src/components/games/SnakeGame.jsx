import React, { useState, useEffect } from 'react';

export default function SnakeGame({ onBack }) {
  const gridSize = 10;
  const [snake, setSnake] = useState([[5,5]]);
  const [food, setFood] = useState([2,2]);
  const [dir, setDir] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKey = e => {
      if(e.key === 'ArrowUp' && dir !== 'DOWN') setDir('UP');
      if(e.key === 'ArrowDown' && dir !== 'UP') setDir('DOWN');
      if(e.key === 'ArrowLeft' && dir !== 'RIGHT') setDir('LEFT');
      if(e.key === 'ArrowRight' && dir !== 'LEFT') setDir('RIGHT');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dir]);

  useEffect(() => {
    if(gameOver) return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = [...prev[0]];
        if(dir==='UP') head[0]--;
        if(dir==='DOWN') head[0]++;
        if(dir==='LEFT') head[1]--;
        if(dir==='RIGHT') head[1]++;
        if(head[0]<0||head[0]>=gridSize||head[1]<0||head[1]>=gridSize || prev.some(p=>p[0]===head[0]&&p[1]===head[1])){
          setGameOver(true);
          return prev;
        }
        const newSnake = [head, ...prev];
        if(head[0]===food[0] && head[1]===food[1]){
          setScore(s=>s+10);
          setFood([Math.floor(Math.random()*gridSize), Math.floor(Math.random()*gridSize)]);
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [dir, food, gameOver]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Snake Game</h2>
      <div className="mb-2">Score: {score}</div>
      <div className="grid gap-0" style={{gridTemplateColumns: `repeat(${gridSize}, 20px)`}}>
        {Array.from({length: gridSize*gridSize}).map((_,i)=>{
          const row=Math.floor(i/gridSize), col=i%gridSize;
          const isSnake = snake.some(p=>p[0]===row && p[1]===col);
          const isFood = food[0]===row && food[1]===col;
          return <div key={i} className={`w-5 h-5 border ${isSnake?'bg-blue-600':isFood?'bg-red-500':'bg-white'}`}></div>
        })}
      </div>
      {gameOver && <div className="text-red-600 font-bold mt-2">Game Over!</div>}
      <button onClick={() => {setSnake([[5,5]]); setFood([2,2]); setScore(0); setGameOver(false); setDir('RIGHT')}} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Restart</button>
      <button onClick={onBack} className="mt-2 px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}
