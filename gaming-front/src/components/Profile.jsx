import React from 'react';

function Profile({ currentUser }) {
  // Mock profile data (expand with real data later)
  const registeredTournaments = ['Battle Royale Championship']; // Example
  const teams = ['Team Alpha']; // Example

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Profile</h2>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <h3>Registered Tournaments</h3>
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
      {/* Add more sections like edit profile, settings, etc. */}
    </div>
  );
}

export default Profile;