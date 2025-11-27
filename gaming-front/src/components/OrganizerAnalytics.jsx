// src/components/OrganizerAnalytics.jsx
import React, { useMemo } from "react";

export default function OrganizerAnalytics({ teams = [] }) {
  const totals = useMemo(() => {
    const totalTeams = teams.length;
    const totalPlayers = teams.reduce((s, t) => s + (t.members?.length || 0), 0);
    const topTeams = [...teams].sort((a, b) => (b.members?.length || 0) - (a.members?.length || 0)).slice(0, 5);
    return { totalTeams, totalPlayers, topTeams };
  }, [teams]);

  return (
    <div>
      <h2>Analytics</h2>
      <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <div style={{ padding: 12, border: "1px solid #e0e0e0", borderRadius: 6 }}>
          <div style={{ fontSize: 20 }}>{totals.totalTeams}</div>
          <div style={{ color: "#666" }}>Total teams</div>
        </div>

        <div style={{ padding: 12, border: "1px solid #e0e0e0", borderRadius: 6 }}>
          <div style={{ fontSize: 20 }}>{totals.totalPlayers}</div>
          <div style={{ color: "#666" }}>Total players</div>
        </div>
      </div>

      <h3>Top Teams by Size</h3>
      <ol>
        {totals.topTeams.map(t => (
          <li key={t.id}>{t.name} — {t.members?.length ?? 0} members</li>
        ))}
      </ol>
    </div>
  );
}
