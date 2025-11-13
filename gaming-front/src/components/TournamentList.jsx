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
    <div style={{ width: "100%", boxSizing: "border-box" }}>

      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Available Tournaments</h2>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="Search tournaments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="ongoing">Ongoing</option>
        </select>
      </div>

      {/* Tournament List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filteredTournaments.map((tournament) => (
          <div
            key={tournament.id}
            style={{
              width: "100%",
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ fontSize: "18px" }}>
              {tournament.name} — {tournament.date} ({tournament.status})
            </div>

            <Link
              to={`/tournament/${tournament.id}`}
              style={{
                padding: "10px 20px",
                background: "#0066ff",
                color: "#ffffff",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "bold"
              }}
            >
              View
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TournamentList;
