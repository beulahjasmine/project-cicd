import React from 'react';

function SpectatorView() {
  return (
        <div style={{ padding: '20px' }}>
          <h2>Spectator View</h2>
          <p>Watch the match live!</p>
          <div style={{ width: '100%', height: '300px', background: '#f9f9f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000000', border: '1px solid #e0e0e0' }}>Live Stream Placeholder</div>
          <p>Chat: (Mock chat here)</p>
        </div>
      );
}

export default SpectatorView;