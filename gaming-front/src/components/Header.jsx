import React from "react";
import { Link } from "react-router-dom";

function Header({ currentUser, onLogout }) {
  return (
    <header
      style={{
        background: "#ffffff",
        color: "#000000",
        padding: "20px 30px",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Title */}
        <h1 style={{ margin: 0, fontSize: "1.7rem" }}>
          GamingPortal
        </h1>

        {/* Right: Navigation */}
        <nav style={{ display: "flex", alignItems: "center" }}>

          {/* COMMON LINKS */}
          <Link to="/tournaments" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
            Tournaments
          </Link>

          {/* PLAYER ONLY */}
          {currentUser?.role === "player" && (
            <>
              <Link to="/team-creation" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Create Team
              </Link>

              <Link to="/player-dashboard" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Dashboard
              </Link>
            </>
          )}

          {/* ORGANIZER ONLY */}
          {currentUser?.role === "organizer" && (
            <>
              <Link to="/organizer" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Dashboard
              </Link>

              <Link to="/organizer-teams" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Teams
              </Link>

              <Link to="/organizer-invitations" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Invitations
              </Link>

              <Link to="/organizer-analytics" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Analytics
              </Link>
            </>
          )}

          {/* LOGGED-IN OPTIONS */}
          {currentUser ? (
            <>
              <Link to="/profile" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Profile
              </Link>

              <Link to="/settings" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Settings
              </Link>

              <button
                onClick={onLogout}
                style={{
                  margin: "0 15px",
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
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
              <Link to="/login" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
                Login
              </Link>

              <Link to="/signup" style={{ margin: "0 15px", fontSize: "1.1rem" }}>
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
