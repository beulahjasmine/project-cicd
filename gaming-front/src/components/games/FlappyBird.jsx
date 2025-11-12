import React, { useState, useEffect } from 'react';

export default function FlappyBird({ onBack }) {
  const [birdY, setBirdY] = useState(50);
  const [obstacleX, setObstacleX] = useState(100);
  const [obstacleGap, setObstacleGap] = useState(30);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if(gameOver) return;
    const interval = setInterval(() => {
      setBirdY(y => y + 1); 
      setObstacleX(x => x - 1);
      if(obstacleX < -10){
        setObstacleX(100);
        setObstacleGap(20 + Math.random()*40);
        setScore(s => s + 1);
      }
      if(birdY > 100 || birdY < 0 || (obstacleX < 10 && (birdY < obstacleGap || birdY > obstacleGap + 20))){
        setGameOver(true);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [birdY, obstacleX, gameOver, obstacleGap]);

  const jump = () => { if(!gameOver) setBirdY(y=>y-10); };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-2">Flappy Bird</h2>
      <div className="relative w-64 h-64 bg-blue-200 overflow-hidden rounded mb-2" onClick={jump}>
        <div className="absolute w-5 h-5 bg-yellow-400 rounded-full" style={{top:`${birdY}%`, left:'20%'}}></div>
        <div className="absolute w-5 bg-green-700" style={{height:`${obstacleGap}%`, left:`${obstacleX}%`}}></div>
        <div className="absolute w-5 bg-green-700" style={{top:`${obstacleGap+20}%`, height:`${100-obstacleGap-20}%`, left:`${obstacleX}%`}}></div>
      </div>
      <div className="mb-2">Score: {score}</div>
      {gameOver && <div className="text-red-600 font-bold mb-2">Game Over!</div>}
      <button onClick={()=>{setBirdY(50); setObstacleX(100); setScore(0); setGameOver(false);}} className="px-4 py-2 bg-blue-600 text-white rounded mb-2">Restart</button>
      <button onClick={onBack} className="px-4 py-2 bg-gray-300 rounded">Back</button>
    </div>
  );
}
