import React from 'react';

function Profile({ currentUser, invitations, onRespondToInvitation, teams }) {
  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  const userInvitations = invitations.filter((inv) => inv.invitedEmail === currentUser.email && inv.status === 'pending');
  const userTeams = teams.filter((team) => team.members.some((m) => m.email === currentUser.email && m.status === 'accepted'));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Profile</h2>
      <p><strong>Email:</strong> {currentUser.email}</p>
      
      <h3>Team Invitations</h3>
      {userInvitations.length === 0 ? (
        <p>No pending invitations.</p>
      ) : (
        <ul>
          {userInvitations.map((inv) => {
            const team = teams.find((t) => t.id === inv.teamId);
            return (
              <li key={inv.id} style={{ marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px', border: '1px solid #e0e0e0' }}>
                <p>Invited to team: <strong>{team ? team.name : 'Unknown'}</strong> by {team ? team.creator : 'Unknown'}</p>
                <button onClick={() => onRespondToInvitation(inv.id, 'accepted')} style={{ marginRight: '10px', padding: '5px 10px', background: '#28a745', color: '#ffffff', border: 'none', borderRadius: '3px' }}>Accept</button>
                <button onClick={() => onRespondToInvitation(inv.id, 'rejected')} style={{ padding: '5px 10px', background: '#dc3545', color: '#ffffff', border: 'none', borderRadius: '3px' }}>Reject</button>
              </li>
            );
          })}
        </ul>
      )}
      
      <h3>Your Teams</h3>
      <ul>
        {userTeams.map((team) => (
          <li key={team.id}>{team.name} (Members: {team.members.map((m) => m.name).join(', ')})</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;