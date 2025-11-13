import React from "react";
import { Link } from "react-router-dom";

function PlayerDashboard({ currentUser, registeredTournaments = [], teams = [], notifications = [] }) {
  if (!currentUser || currentUser.role !== "player") {
    return <p>Access denied. This is for players only.</p>;
  }

  // Mock upcoming tournaments
  const upcoming = [
    { id: 1, name: "Pro League Showdown", date: "2024-01-20" },
    { id: 2, name: "Legends Arena Cup", date: "2024-01-25" },
  ];

  // Mock stats
  const stats = {
    matchesPlayed: 14,
    wins: 6,
    rank: 42,
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Player Dashboard</h2>
      <p style={styles.welcome}>Welcome, {currentUser.email}</p>

      {/* STATS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Stats</h3>
        <div style={styles.row}>
          <div style={styles.card}>
            <p><strong>Matches Played:</strong> {stats.matchesPlayed}</p>
          </div>
          <div style={styles.card}>
            <p><strong>Wins:</strong> {stats.wins}</p>
          </div>
          <div style={styles.card}>
            <p><strong>Rank:</strong> #{stats.rank}</p>
          </div>
        </div>
      </section>

      {/* REGISTERED TOURNAMENTS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Registered Tournaments</h3>
        {registeredTournaments.length === 0 ? (
          <p>No tournaments joined yet.</p>
        ) : (
          <ul style={styles.list}>
            {registeredTournaments.map((t, i) => (
              <li key={i} style={styles.listItem}>{t}</li>
            ))}
          </ul>
        )}
      </section>

      {/* TEAMS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Your Teams</h3>
        {teams.length === 0 ? (
          <p>You are not part of any teams.</p>
        ) : (
          teams.map((team, i) => (
            <div key={i} style={styles.teamCard}>
              <strong>{team.name}</strong>
              <p>Members: {team.members.length}</p>
            </div>
          ))
        )}
      </section>

      {/* UPCOMING */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Upcoming Tournaments</h3>
        <div style={styles.grid}>
          {upcoming.map((t) => (
            <div key={t.id} style={styles.card}>
              <strong>{t.name}</strong>
              <p>{t.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Notifications</h3>
        {notifications.length === 0 ? (
          <p>No notifications.</p>
        ) : (
          notifications.map((n, i) => (
            <div key={i} style={styles.notification}>
              {n}
            </div>
          ))
        )}
      </section>

      {/* QUICK ACTIONS */}
      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
        <div style={styles.buttonRow}>
          <Link to="/" style={styles.primaryBtn}>Join Tournament</Link>
          <Link to="/profile" style={styles.secondaryBtn}>Edit Profile</Link>
          <Link to="/leaderboard/1" style={styles.secondaryBtn}>View Leaderboard</Link>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "white",
    padding: "20px 40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "black",
  },
  welcome: {
    marginBottom: "20px",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "20px",
    color: "#1e90ff",
    borderBottom: "2px solid #1e90ff",
    paddingBottom: "5px",
    marginBottom: "15px",
  },
  row: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    border: "1px solid #1e90ff",
    padding: "15px",
    borderRadius: "6px",
    background: "#f0f8ff",
  },
  teamCard: {
    border: "1px solid #1e90ff",
    padding: "15px",
    borderRadius: "6px",
    background: "#f0f8ff",
    marginBottom: "10px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "0",
  },
  listItem: {
    padding: "10px",
    background: "#f0f8ff",
    border: "1px solid #1e90ff",
    borderRadius: "5px",
    marginBottom: "8px",
  },
  notification: {
    border: "1px solid #1e90ff",
    padding: "10px",
    borderRadius: "5px",
    background: "#f0faff",
    marginBottom: "10px",
  },
  buttonRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    padding: "10px 20px",
    background: "#1e90ff",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
  },
  secondaryBtn: {
    padding: "10px 20px",
    border: "1px solid #1e90ff",
    color: "#1e90ff",
    borderRadius: "5px",
    textDecoration: "none",
  },
};

export default PlayerDashboard;
