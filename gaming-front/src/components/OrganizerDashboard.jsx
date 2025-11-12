import React, { useState } from 'react';

function OrganizerDashboard({ tournaments, setTournaments }) {
  const [newTournament, setNewTournament] = useState({ name: '', date: '' });

  const addTournament = () => {
    setTournaments([...tournaments, { ...newTournament, id: Date.now(), status: 'open' }]);
    setNewTournament({ name: '', date: '' });
  };

 return (
       <div style={{ padding: '20px' }}>
         <h2>Organizer Dashboard</h2>
         <h3>Add Tournament</h3>
         <input type="text" placeholder="Tournament Name" value={newTournament.name} onChange={(e) => setNewTournament({ ...newTournament, name: e.target.value })} />
         <input type="date" value={newTournament.date} onChange={(e) => setNewTournament({ ...newTournament, date: e.target.value })} />
         <button onClick={addTournament}>Add</button>
         <h3>Existing Tournaments</h3>
         <ul>
           {tournaments.map((t) => (
             <li key={t.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
               <span>{t.name} - {t.date} ({t.players?.length || 0} players)</span>
             </li>
           ))}
         </ul>
       </div>
     );
}

export default OrganizerDashboard;