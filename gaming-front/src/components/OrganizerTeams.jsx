// src/components/OrganizerTeams.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function OrganizerTeams({
  teams = [],
  invitations = [],
  onDeleteTeam,
  onRefresh, // optional callback if you want to re-fetch
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | pending-invites | large

  const filtered = useMemo(() => {
    let list = teams;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((t) => t.name.toLowerCase().includes(q) || t.creator.toLowerCase().includes(q));
    }
    if (filter === "pending-invites") {
      const teamIdsWithPending = new Set(invitations.filter(inv => inv.status === "pending").map(inv => inv.teamId));
      list = list.filter(t => teamIdsWithPending.has(t.id));
    } else if (filter === "large") {
      list = list.filter(t => t.members && t.members.length >= 5);
    }
    return list;
  }, [teams, invitations, query, filter]);

  return (
    <div>
      <h2>Teams Management</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search teams or creators..."
          style={{ padding: 8, flex: 1 }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: 8 }}>
          <option value="all">All teams</option>
          <option value="pending-invites">Has pending invitations</option>
          <option value="large">Large teams (5+)</option>
        </select>
        <button onClick={() => onRefresh && onRefresh()} style={{ padding: 8 }}>
          Refresh
        </button>
      </div>

      {filtered.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {filtered.map((team) => (
            <div key={team.id} style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: 16 }}>{team.name}</strong>
                <div style={{ fontSize: 13, color: "#666" }}>Creator: {team.creator}</div>
                <div style={{ fontSize: 13, color: "#666" }}>Members: {team.members?.length ?? 0}</div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <Link to={`/organizer-teams/${team.id}`} style={{ padding: "6px 10px", textDecoration: "none", border: "1px solid #007bff", borderRadius: 4 }}>
                  View
                </Link>

                <Link to={`/organizer-teams/${team.id}/edit`} style={{ padding: "6px 10px", textDecoration: "none", border: "1px solid #28a745", borderRadius: 4 }}>
                  Edit
                </Link>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete team "${team.name}"? This action cannot be undone.`)) {
                      onDeleteTeam(team.id);
                    }
                  }}
                  style={{ padding: "6px 10px", background: "#dc3545", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
