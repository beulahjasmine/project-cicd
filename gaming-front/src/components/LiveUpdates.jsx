import React, { useState, useEffect } from 'react';

function LiveUpdates() {
  const [updates, setUpdates] = useState(['Match started!']);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdates((prev) => [...prev, 'New update: Player scored!']);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

   return (
       <div style={{ padding: '20px' }}>
         <h2>Live Updates</h2>
         <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
           {updates.map((update, index) => (
             <li key={index}>{update}</li>
           ))}
         </ul>
       </div>
     );
}

export default LiveUpdates;