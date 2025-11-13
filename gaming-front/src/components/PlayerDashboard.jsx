import React from 'react';

function PlayerDashboard({ currentUser }) {
  // Mock data for player (expand with real data)
  const registeredTournaments = ['Battle Royale Championship']; // Example
  const teams = ['Team Alpha']; // Example

  if (!currentUser || currentUser.role !== 'player') {
    return <p>Access denied. This is for players only.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Player Dashboard</h2>
      <p>Welcome, {currentUser.email}!</p>
      <h3>Your Registered Tournaments</h3>
      <ul>
        {registeredTournaments.map((tournament, index) => (
          <li key={index}>{tournament}</li>
        ))}
      </ul>
      <h3>Your Teams</h3>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>{team}</li>
        ))}
      </ul>
      {/* Add links to register for more tournaments, view leaderboards, etc. */}
    </div>
  );
}

export default PlayerDashboard;