import React, { useState } from 'react';

export default function TicTacToe({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isX ? 'X' : 'O';
    setBoard(newBoard);
    setWinner(checkWinner(newBoard));
    setIsX(!isX);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-4">Tic Tac Toe</h2>
      {winner && <div className="mb-4 text-xl text-blue-600">Winner: {winner} 🎉</div>}
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-16 h-16 text-2xl font-bold border-2 border-gray-400 rounded"
          >
            {cell}
          </button>
        ))}
      </div>
      <button
        onClick={() => { setBoard(Array(9).fill(null)); setIsX(true); setWinner(null); }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Reset
      </button>
      <button
        onClick={onBack}
        className="mt-2 px-4 py-2 bg-gray-300 rounded"
      >
        Back
      </button>
    </div>
  );
}
