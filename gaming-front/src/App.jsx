import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import PlayerDashboard from './components/PlayerDashboard';

import TestBackend from "./components/TestBackend";


function App() {
  const [tournaments, setTournaments] = useState([
    { id: 1, name: 'Battle Royale Championship', date: '2023-10-15', status: 'open' },
    { id: 2, name: 'Strategy Masters', date: '2023-10-20', status: 'ongoing' },
  ]);

  const [users, setUsers] = useState([
    { email: 'user@example.com', password: 'password123', role: 'player' },
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  // New state for teams and invitations
  const [teams, setTeams] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const handleLogin = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleSignup = (email, password, role) => {
    if (users.find((u) => u.email === email)) {
      return false;
    }
    const newUser = { email, password, role };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdatePassword = (newPassword) => {
    setUsers(users.map((u) => (u.email === currentUser.email ? { ...u, password: newPassword } : u)));
    setCurrentUser({ ...currentUser, password: newPassword });
  };

  const handleResetPassword = (email, newPassword) => {
    setUsers(users.map((u) => (u.email === email ? { ...u, password: newPassword } : u)));
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser({ ...user, password: newPassword });
    }
  };

  const handleCreateTeam = (teamName, members) => {
    const newTeam = {
      id: Date.now(),
      name: teamName,
      creator: currentUser.email,
      members: [{ name: currentUser.email, email: currentUser.email, status: 'accepted' }],
    };
    setTeams([...teams, newTeam]);

    members.forEach((member) => {
      const invitation = {
        id: Date.now() + Math.random(),
        teamId: newTeam.id,
        invitedEmail: member.email,
        status: 'pending',
      };
      setInvitations([...invitations, invitation]);
    });
  };

  const handleRespondToInvitation = (invitationId, response) => {
    setInvitations(invitations.map((inv) =>
      inv.id === invitationId ? { ...inv, status: response } : inv
    ));

    if (response === 'accepted') {
      const invitation = invitations.find((inv) => inv.id === invitationId);
      const team = teams.find((t) => t.id === invitation.teamId);
      if (team) {
        const member = { name: invitation.invitedEmail, email: invitation.invitedEmail, status: 'accepted' };
        setTeams(teams.map((t) =>
          t.id === team.id ? { ...t, members: [...t.members, member] } : t
        ));
      }
    }
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
            <Route path="/team-creation" element={<TeamCreation onCreateTeam={handleCreateTeam} />} />
            <Route path="/organizer" element={currentUser && currentUser.role === 'organizer' ? <OrganizerDashboard tournaments={tournaments} setTournaments={setTournaments} /> : <Navigate to="/" />} />
            <Route path="/live-updates/:id" element={<LiveUpdates />} />
            <Route path="/prizes/:id" element={<PrizeDistribution />} />
            <Route path="/spectator/:id" element={<SpectatorView />} />
            <Route path="/login" element={<Login onLogin={handleLogin} onResetPassword={handleResetPassword} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="/profile" element={<Profile currentUser={currentUser} invitations={invitations} onRespondToInvitation={handleRespondToInvitation} teams={teams} />} />
            <Route path="/player-dashboard" element={<PlayerDashboard currentUser={currentUser} />} />

            <Route path="/test" element={<TestBackend />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;