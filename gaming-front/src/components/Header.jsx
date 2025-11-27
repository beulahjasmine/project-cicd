import React from 'react';
import { Link } from 'react-router-dom';

function Header({ currentUser, onLogout }) {
  return (
    <header
      style={{
        background: '#ffffff',
        color: '#000000',
        padding: '15px 30px',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Left side: Title */}
        <h1 style={{ fontSize: '1.6rem', margin: 0 }}>
          GamingPortal
        </h1>

        {/* Right side: Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
            Tournaments
          </Link>

          <Link to="/team-creation" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
            Create Team
          </Link>

          {currentUser && currentUser.role === 'organizer' && (
            <Link to="/organizer" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
              Organizer Dashboard
            </Link>
          )}

          {currentUser && currentUser.role === 'player' && (
            <Link to="/player-dashboard" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
              Player Dashboard
            </Link>
          )}

          {currentUser ? (
            <>
              <Link to="/profile" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
                Profile
              </Link>

              <Link to="/settings" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
                Settings
              </Link>

              <button
                onClick={onLogout}
                style={{
                  margin: '0 15px',
                  background: '#007bff',
                  color: '#ffffff',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
                Login
              </Link>

              <Link to="/signup" style={{ margin: '0 15px', fontSize: '1.1rem' }}>
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
