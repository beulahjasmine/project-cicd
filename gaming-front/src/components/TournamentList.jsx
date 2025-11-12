import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TournamentList({ tournaments }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tournament.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2>Available Tournaments</h2>
      <input type="text" placeholder="Search tournaments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ marginBottom: '10px' }} />
      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ marginBottom: '20px' }}>
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="ongoing">Ongoing</option>
      </select>
      <ul>
        {filteredTournaments.map((tournament) => (
          <li key={tournament.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{tournament.name} - {tournament.date} ({tournament.status})</span>
            <Link to={`/tournament/${tournament.id}`} style={{ padding: '5px 10px', background: '#007bff', color: '#ffffff', borderRadius: '3px' }}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentList;