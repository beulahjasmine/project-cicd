import React from 'react';

function Leaderboard() {
  // Mock leaderboard data
  const leaderboard = [
    { name: 'Player1', score: 100 },
    { name: 'Player2', score: 90 },
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