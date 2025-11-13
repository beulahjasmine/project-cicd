import React from 'react';

function Leaderboard() {
  // Mock leaderboard data
  const leaderboard = [
    { name: 'Player1', score: 100 },
    { name: 'Player2', score: 90 },
    { name: 'Player3', score: 80 },
    { name: 'Player4', score: 70 },
    { name: 'Player5', score: 60 }
  ];

  return (
       <div style={{ padding: '20px' }}>
         <h2>Leaderboard</h2>
         <ul>
           {leaderboard.map((player, index) => (
             <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span>{index + 1}. {player.name}</span>
               <span>{player.score} points</span>
             </li>
           ))}
         </ul>
       </div>
     );
}

export default Leaderboard;