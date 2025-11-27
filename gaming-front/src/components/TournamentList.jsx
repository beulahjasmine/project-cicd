import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TournamentList({ tournaments }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // new
  const [currentPage, setCurrentPage] = useState(1); // new

  const pageSize = 5;

  // --- Filtering ---
  const filteredTournaments = tournaments.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // --- Sorting ---
  const sortedTournaments = [...filteredTournaments].sort((a, b) => {
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  // --- Pagination ---
  const totalPages = Math.ceil(sortedTournaments.length / pageSize);
  const paginatedTournaments = sortedTournaments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const badgeStyle = (status) => {
    const colors = {
      open: '#27ae60',
      ongoing: '#f39c12',
      completed: '#7f8c8d'
    };
    return {
      padding: '4px 10px',
      borderRadius: '6px',
      color: '#fff',
      background: colors[status] || '#888',
      fontSize: '12px',
      textTransform: 'capitalize'
    };
  };

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Available Tournaments</h2>

      {/* Search + Filters + Sort */}
      <div style={{
        display: "flex",
        gap: "15px",
        marginBottom: "25px",
        flexWrap: "wrap"
      }}>
        <input
          type="text"
          placeholder="Search tournaments..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
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
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
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
          <option value="completed">Completed</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Total Count */}
      <div style={{ marginBottom: "15px", fontSize: "14px", color: "#555" }}>
        {sortedTournaments.length} tournaments found
      </div>

      {/* Tournament List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {paginatedTournaments.length === 0 ? (
          <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
            No tournaments match your criteria.
          </div>
        ) : (
          paginatedTournaments.map((tournament) => (
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
                <strong>{tournament.name}</strong> — {tournament.date}
                <span style={{ marginLeft: "10px", ...badgeStyle(tournament.status) }}>
                  {tournament.status}
                </span>
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
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "25px",
          gap: "10px"
        }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: "8px 16px" }}
          >
            Prev
          </button>

          <div style={{ padding: "8px 16px" }}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: "8px 16px" }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default TournamentList;
