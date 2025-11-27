import React from "react";
import { Link } from "react-router-dom";

function Header({ currentUser, onLogout }) {
  return (
    <header
      style={{
        background: "#007bff",
        color: "#ffffff",
        padding: "20px 30px",
        borderBottom: "1px solid #0056b3",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }}>
          <h1 style={{ margin: 0, fontSize: "1.7rem" }}>
            GamingPortal
          </h1>
        </Link>

        {/* Right: Navigation */}
        <nav style={{ display: "flex", alignItems: "center" }}>

          {/* COMMON LINKS */}
          <Link
            to="/tournaments"
            style={{
              margin: "0 15px",
              fontSize: "1.1rem",
              color: "#ffffff",
              textDecoration: "none"
            }}
          >
            Tournaments
          </Link>

          {/* PLAYER ONLY */}
          {currentUser?.role === "player" && (
            <>
              <Link
                to="/team-creation"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Create Team
              </Link>

              <Link
                to="/player-dashboard"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Dashboard
              </Link>
            </>
          )}

          {/* ORGANIZER ONLY */}
          {currentUser?.role === "organizer" && (
            <>
              <Link
                to="/organizer"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Dashboard
              </Link>

              <Link
                to="/organizer-teams"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Teams
              </Link>

              <Link
                to="/organizer-invitations"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Invitations
              </Link>

              <Link
                to="/organizer-analytics"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Analytics
              </Link>
            </>
          )}

          {/* LOGGED-IN OPTIONS */}
          {currentUser ? (
            <>
              <Link
                to="/profile"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Profile
              </Link>

              <Link
                to="/settings"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Settings
              </Link>

              <button
                onClick={onLogout}
                style={{
                  margin: "0 15px",
                  background: "transparent",
                  color: "#ffffff",
                  border: "1px solid #ffffff",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                style={{
                  margin: "0 15px",
                  fontSize: "1.1rem",
                  color: "#ffffff",
                  textDecoration: "none"
                }}
              >
                Signup
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}

export default Header;
