import React from 'react';
import { useParams, Link } from 'react-router-dom';

function TournamentDetails({ tournaments }) {
  const { id } = useParams();
  const tournament = tournaments.find((t) => t.id === parseInt(id));

  if (!tournament) return <p>Tournament not found.</p>;

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '10px', margin: '20px 0', border: '1px solid #e0e0e0' }}>
      <h2>{tournament.name}</h2>
      <p>Date: {tournament.date}</p>
      <p>Status: {tournament.status}</p>
      <div style={{ marginTop: '20px' }}>
        <Link to={`/register/${id}`} style={{ marginRight: '10px' }}>Register</Link> | 
        <Link to={`/leaderboard/${id}`} style={{ margin: '0 10px' }}>Leaderboard</Link> | 
        <Link to={`/schedule/${id}`} style={{ margin: '0 10px' }}>Schedule</Link> | 
        <Link to={`/live-updates/${id}`} style={{ margin: '0 10px' }}>Live Updates</Link> | 
        <Link to={`/prizes/${id}`} style={{ margin: '0 10px' }}>Prizes</Link> | 
        <Link to={`/spectator/${id}`} style={{ marginLeft: '10px' }}>Spectator View</Link>
      </div>
    </div>
  );
}

export default TournamentDetails;