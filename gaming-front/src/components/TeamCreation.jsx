import React, { useState } from 'react';

function TeamCreation({ onCreateTeam }) {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([{ name: '', email: '' }]);

  const addMember = () => {
    setMembers([...members, { name: '', email: '' }]);
  };

  const updateMember = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teamName || members.some((m) => !m.name || !m.email)) {
      alert('Please fill in all fields');
      return;
    }
    onCreateTeam(teamName, members);
    alert('Team created! Invitations sent.');
    setTeamName('');
    setMembers([{ name: '', email: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px', border: '1px solid #e0e0e0' }}>
      <h2>Create Team</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Team Name</label>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px' }}
        />
      </div>
      
      <h3>Invite Members</h3>
      {members.map((member, index) => (
        <div key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Member Name"
            value={member.name}
            onChange={(e) => updateMember(index, 'name', e.target.value)}
            required
            style={{ flex: 1, padding: '10px', marginRight: '10px', border: '1px solid #cccccc', borderRadius: '5px' }}
          />
          <input
            type="email"
            placeholder="Member Email"
            value={member.email}
            onChange={(e) => updateMember(index, 'email', e.target.value)}
            required
            style={{ flex: 1, padding: '10px', marginRight: '10px', border: '1px solid #cccccc', borderRadius: '5px' }}
          />
          {members.length > 1 && (
            <button type="button" onClick={() => removeMember(index)} style={{ padding: '10px', background: '#dc3545', color: '#ffffff', border: 'none', borderRadius: '5px' }}>Remove</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addMember} style={{ marginBottom: '15px', padding: '10px', background: '#28a745', color: '#ffffff', border: 'none', borderRadius: '5px' }}>Add Another Member</button>
      
      <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: '#ffffff', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Create Team</button>
    </form>
  );
}

export default TeamCreation;