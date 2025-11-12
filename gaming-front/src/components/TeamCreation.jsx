import React, { useState } from 'react';

function TeamCreation() {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState(['']);

  const addMember = () => setMembers([...members, '']);
  const updateMember = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Team ${teamName} created with members: ${members.join(', ')}`);
  };

  return (
       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
         <h2>Create Team</h2>
         <input type="text" placeholder="Team Name" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
         {members.map((member, index) => (
           <input key={index} type="text" placeholder={`Member ${index + 1}`} value={member} onChange={(e) => updateMember(index, e.target.value)} required />
         ))}
         <button type="button" onClick={addMember} style={{ marginRight: '10px' }}>Add Member</button>
         <button type="submit">Create Team</button>
       </form>
     );
}

export default TeamCreation;