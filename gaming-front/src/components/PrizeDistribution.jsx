import React from 'react';

function PrizeDistribution() {
  // Mock prizes
  const prizes = [
    { place: 1, prize: '$1000' },
    { place: 2, prize: '$500' },
  ];

  return (
        <div style={{ padding: '20px' }}>
          <h2>Prize Distribution</h2>
          <ul>
            {prizes.map((p) => (
              <li key={p.place} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{p.place}st Place</span>
                <span>{p.prize}</span>
              </li>
            ))}
          </ul>
        </div>
      );
}

export default PrizeDistribution;
