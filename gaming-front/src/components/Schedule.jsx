import React from 'react';

function Schedule() {
  // Mock schedule data
  const schedule = [
    { time: '10:00 AM', match: 'Player1 vs Player2' },
    { time: '11:00 AM', match: 'Player3 vs Player4' },
  ];

  return (
       <div style={{ padding: '20px' }}>
         <h2>Tournament Schedule</h2>
         <ul>
           {schedule.map((item, index) => (
             <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span>{item.time}</span>
               <span>{item.match}</span>
             </li>
           ))}
         </ul>
       </div>
     );
}

export default Schedule;