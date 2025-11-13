import React from "react";
import { useParams, Link } from "react-router-dom";

function TournamentDetails({ tournaments }) {
  const { id } = useParams();
  const tournament = tournaments.find((t) => t.id === parseInt(id));

  if (!tournament) return <p>Tournament not found.</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>{tournament.name}</h2>

      <p style={styles.info}><strong>Date:</strong> {tournament.date}</p>
      <p style={styles.info}><strong>Status:</strong> {tournament.status}</p>

      <div style={styles.linksBox}>
        <Link to={`/register/${id}`} style={styles.link}>Register</Link>
        <Link to={`/leaderboard/${id}`} style={styles.link}>Leaderboard</Link>
        <Link to={`/schedule/${id}`} style={styles.link}>Schedule</Link>
        <Link to={`/live-updates/${id}`} style={styles.link}>Live Updates</Link>
        <Link to={`/prizes/${id}`} style={styles.link}>Prizes</Link>
        <Link to={`/spectator/${id}`} style={styles.link}>Spectator View</Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    padding: "40px",
    background: "white",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "10px",
  },
  info: {
    fontSize: "18px",
    margin: "6px 0",
  },
  linksBox: {
    marginTop: "25px",
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
  },
  link: {
    padding: "12px 20px",
    background: "#1e90ff",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default TournamentDetails;
