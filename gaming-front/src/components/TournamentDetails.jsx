import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function TournamentDetails({ tournaments }) {
  const { id } = useParams();
  const tournament = tournaments.find((t) => t.id === parseInt(id));

  const [registered, setRegistered] = useState(false);
  const [countdown, setCountdown] = useState("");

  if (!tournament) return <p>Tournament not found.</p>;

  // COUNTDOWN TIMER
  useEffect(() => {
    const target = new Date(tournament.date);

    const updateTimer = () => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Event has started!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m left`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [tournament.date]);

  // JOIN / LEAVE ACTION
  const toggleRegistration = () => {
    setRegistered(!registered);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>{tournament.name}</h1>

      {/* COUNTDOWN */}
      <p style={styles.countdown}>{countdown}</p>

      {/* BASIC INFO */}
      <section style={styles.section}>
        <h3 style={styles.heading}>Tournament Overview</h3>
        <p><strong>Date:</strong> {tournament.date}</p>
        <p><strong>Status:</strong> {tournament.status}</p>
        <p><strong>Prize Pool:</strong> ₹150,000</p>
        <p><strong>Registered Players:</strong> 128 / 250</p>
      </section>

      {/* JOIN / LEAVE BUTTON */}
      <button
        onClick={toggleRegistration}
        style={registered ? styles.leaveBtn : styles.joinBtn}
      >
        {registered ? "Leave Tournament" : "Join Tournament"}
      </button>

      {/* FEATURE LINKS */}
      <section style={styles.section}>
        <h3 style={styles.heading}>Tournament Sections</h3>
        <div style={styles.linksBox}>
          <Link to={`/leaderboard/${id}`} style={styles.link}>Leaderboard</Link>
          <Link to={`/schedule/${id}`} style={styles.link}>Schedule</Link>
          <Link to={`/live-updates/${id}`} style={styles.link}>Live Updates</Link>
          <Link to={`/prizes/${id}`} style={styles.link}>Prize Details</Link>
          <Link to={`/spectator/${id}`} style={styles.link}>Spectator View</Link>
        </div>
      </section>

      {/* RULES */}
      <section style={styles.section}>
        <h3 style={styles.heading}>Rules & Guidelines</h3>
        <ul style={styles.rules}>
          <li>Players must join 10 minutes before the match.</li>
          <li>Boosting or cheating results in instant ban.</li>
          <li>All matches are monitored by admins.</li>
          <li>Final decisions are made by the organizers.</li>
        </ul>
      </section>

      {/* ORGANIZER INFO */}
      <section style={styles.section}>
        <h3 style={styles.heading}>Organizer Details</h3>
        <p><strong>Hosted By:</strong> Gaming Portal Team</p>
        <p><strong>Contact:</strong> support@gamingportal.com</p>
      </section>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "white",
    padding: "30px 50px",
    boxSizing: "border-box",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "black",
  },
  countdown: {
    marginTop: "5px",
    fontSize: "18px",
    color: "#1e90ff",
  },
  section: {
    marginTop: "30px",
  },
  heading: {
    fontSize: "22px",
    color: "#1e90ff",
    borderBottom: "2px solid #1e90ff",
    paddingBottom: "5px",
    marginBottom: "10px",
  },
  linksBox: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  link: {
    padding: "10px 18px",
    background: "#1e90ff",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "16px",
  },
  joinBtn: {
    marginTop: "20px",
    padding: "12px 20px",
    background: "#1e90ff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
  },
  leaveBtn: {
    marginTop: "20px",
    padding: "12px 20px",
    background: "white",
    color: "red",
    border: "2px solid red",
    borderRadius: "6px",
    fontSize: "18px",
    cursor: "pointer",
  },
  rules: {
    paddingLeft: "20px",
    lineHeight: "1.7",
  },
};

export default TournamentDetails;
