import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TournamentList from './components/TournamentList';
import TournamentDetails from './components/TournamentDetails';
import RegistrationForm from './components/RegistrationForm';
import Leaderboard from './components/Leaderboard';
import Schedule from './components/Schedule';
import TeamCreation from './components/TeamCreation';
import OrganizerDashboard from './components/OrganizerDashboard';
import LiveUpdates from './components/LiveUpdates';
import PrizeDistribution from './components/PrizeDistribution';
import SpectatorView from './components/SpectatorView';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile'; 

function App() {
  // Mock data for tournaments
  const [tournaments, setTournaments] = useState([
    { id: 1, name: 'Battle Royale Championship', date: '2023-10-15', status: 'open' },
    { id: 2, name: 'Strategy Masters', date: '2023-10-20', status: 'ongoing' },
  ]);

  // Mock users for auth
  const [users, setUsers] = useState([
    { email: 'user@example.com', password: 'password123' },
  ]);

  // Auth state
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleSignup = (email, password) => {
    if (users.find((u) => u.email === email)) {
      return false; // User already exists
    }
    setUsers([...users, { email, password }]);
    setCurrentUser({ email, password });
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="app">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <main>
          <Routes>
            <Route path="/" element={<TournamentList tournaments={tournaments} />} />
            <Route path="/tournament/:id" element={<TournamentDetails tournaments={tournaments} />} />
            <Route path="/register/:id" element={<RegistrationForm tournaments={tournaments} setTournaments={setTournaments} />} />
            <Route path="/leaderboard/:id" element={<Leaderboard />} />
            <Route path="/schedule/:id" element={<Schedule />} />
            <Route path="/team-creation" element={<TeamCreation />} />
            <Route path="/organizer" element={<OrganizerDashboard tournaments={tournaments} setTournaments={setTournaments} />} />
            <Route path="/live-updates/:id" element={<LiveUpdates />} />
            <Route path="/prizes/:id" element={<PrizeDistribution />} />
            <Route path="/spectator/:id" element={<SpectatorView />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;