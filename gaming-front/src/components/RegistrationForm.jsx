import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RegistrationForm({ tournaments, setTournaments }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock registration: Add player to tournament
    setTournaments((prev) =>
      prev.map((t) =>
        t.id === parseInt(id) ? { ...t, players: [...(t.players || []), playerName] } : t
      )
    );
    navigate(`/tournament/${id}`);
  };

  return (
       <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto' }}>
         <h2>Register for Tournament</h2>
         <input type="text" placeholder="Player Name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} required />
         <button type="submit">Register</button>
       </form>
     );
}

export default RegistrationForm;
