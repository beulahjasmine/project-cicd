import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const featuredTournaments = [
    {
      id: 1,
      name: "Valorant Pro League",
      date: "Dec 12, 2025",
      game: "Valorant",
      prize: "$5,000",
    },
    {
      id: 2,
      name: "CS2 Winter Cup",
      date: "Jan 5, 2026",
      game: "Counter-Strike 2",
      prize: "$3,000",
    },
    {
      id: 3,
      name: "FIFA Ultimate Clash",
      date: "Dec 22, 2025",
      game: "FIFA 25",
      prize: "$2,000",
    },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero Section */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 20px",
          background: "#f5f6fa",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          Welcome to the Gaming Tournament Portal
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Discover, register, and compete in top gaming tournaments.
        </p>

        <div style={{ marginTop: "25px" }}>
          <Link
            to="/tournaments"
            style={{
              padding: "10px 20px",
              marginRight: "15px",
              background: "#007bff",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Explore Tournaments
          </Link>

          <Link
            to="/team-creation"
            style={{
              padding: "10px 20px",
              background: "#28a745",
              color: "#fff",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Create a Team
          </Link>
        </div>
      </section>

      {/* Featured Tournaments */}
      <section style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Featured Tournaments
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {featuredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              style={{
                width: "280px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "20px",
                background: "#ffffff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <h3>{tournament.name}</h3>
              <p>
                <strong>Date:</strong> {tournament.date}
              </p>
              <p>
                <strong>Game:</strong> {tournament.game}
              </p>
              <p>
                <strong>Prize Pool:</strong> {tournament.prize}
              </p>
              <Link
                to="/tournaments"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        style={{
          padding: "40px 20px",
          background: "#f8f9fa",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          How It Works
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "300px", textAlign: "center" }}>
            <h3>1. Create Your Team</h3>
            <p>Build a team with your friends and prepare to compete.</p>
          </div>

          <div style={{ maxWidth: "300px", textAlign: "center" }}>
            <h3>2. Join Tournaments</h3>
            <p>Register for tournaments that match your preferred games.</p>
          </div>

          <div style={{ maxWidth: "300px", textAlign: "center" }}>
            <h3>3. Compete and Win</h3>
            <p>Showcase your skills, climb the leaderboard, and win prizes.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          textAlign: "center",
          padding: "50px 20px",
          background: "#ffffff",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <h2>Ready to Start Competing?</h2>
        <p style={{ color: "#555" }}>
          Join thousands of players participating in tournaments every week.
        </p> <br />

        <Link
          to="/signup"
          style={{
            padding: "12px 25px",
            background: "#007bff",
            color: "#ffffff",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "1.1rem",
          }}
        > 
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
