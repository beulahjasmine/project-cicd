import React, { useState, useEffect } from 'react';
import { getTournaments } from './api/api';
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
import Settings from "./components/Settings";
import TestBackend from "./components/TestBackend";
import HomePage from "./components/HomePage";

import OrganizerTeams from "./components/OrganizerTeams";
import TeamDetails from "./components/TeamDetails";
import TeamEditor from "./components/TeamEditor";
import InvitationsManager from "./components/InvitationsManager";
import OrganizerAnalytics from "./components/OrganizerAnalytics";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    getTournaments().then(res => setTournaments(res.data));
  }, []);

  const [users, setUsers] = useState([
    { email: 'user1@example.com', password: 'user1', role: 'player' },
    { email: 'organizer1@example.com', password: 'organizer1', role: 'organizer' },
    { email: 'user2@example.com', password: 'user2', role: 'player' }
  ]);

  const [currentUser, setCurrentUser] = useState(null);

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
    if (users.find((u) => u.email === email)) return false;

    const newUser = { email, password, role };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdatePassword = (newPassword) => {
    setUsers(users.map((u) =>
      u.email === currentUser.email ? { ...u, password: newPassword } : u
    ));

    setCurrentUser({ ...currentUser, password: newPassword });
  };

  const handleResetPassword = (email, newPassword) => {
    setUsers(users.map((u) =>
      u.email === email ? { ...u, password: newPassword } : u
    ));

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
      members: [
        {
          name: currentUser.email,
          email: currentUser.email,
          status: 'accepted'
        }
      ]
    };

    setTeams([...teams, newTeam]);

    members.forEach((member) => {
      const invitation = {
        id: Date.now() + Math.random(),
        teamId: newTeam.id,
        invitedEmail: member.email,
        status: 'pending',
      };
      setInvitations(prev => [...prev, invitation]);
    });
  };

  const handleRespondToInvitation = (invitationId, response) => {
    setInvitations(prevInv => {
      const next = prevInv.map(inv =>
        inv.id === invitationId ? { ...inv, status: response } : inv
      );

      if (response === "accepted") {
        const inv = prevInv.find(i => i.id === invitationId);
        if (inv) {
          setTeams(prevTeams =>
            prevTeams.map(team => {
              if (team.id === inv.teamId) {
                const exists = (team.members || []).some(
                  m => m.email === inv.invitedEmail
                );
                if (exists) return team;

                const member = {
                  name: inv.invitedEmail,
                  email: inv.invitedEmail,
                  status: "accepted"
                };

                return {
                  ...team,
                  members: [...(team.members || []), member]
                };
              }
              return team;
            })
          );
        }
      }
      return next;
    });
  };

  const handleSendInvitation = (teamId, invitedEmail) => {
    setInvitations(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        teamId,
        invitedEmail,
        status: "pending",
      },
    ]);
  };

  const handleUpdateTeam = (teamId, updates) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, ...updates } : t));
  };

  const handleDeleteTeam = (teamId) => {
    setTeams(prev => prev.filter(t => t.id !== teamId));
    setInvitations(prev => prev.filter(inv => inv.teamId !== teamId));
  };

  const handleRemoveMember = (teamId, memberEmail) => {
    setTeams(prev =>
      prev.map(t =>
        t.id === teamId
          ? { ...t, members: t.members.filter(m => m.email !== memberEmail) }
          : t
      )
    );
  };

  const handleResendInvitation = (invitationId) => {
    setInvitations(prev =>
      prev.map(inv =>
        inv.id === invitationId ? { ...inv, resentAt: Date.now() } : inv
      )
    );
  };

  return (
    <Router>
      <div className="app">
        <Header currentUser={currentUser} onLogout={handleLogout} />

        <main
          style={{
            width: "100%",
            padding: "40px",
            maxWidth: "1200px",
            margin: "0 auto",
            boxSizing: "border-box"
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/tournaments" element={<TournamentList tournaments={tournaments} />} />
            <Route path="/tournament/:id" element={<TournamentDetails tournaments={tournaments} />} />
            <Route path="/register/:id" element={<RegistrationForm tournaments={tournaments} setTournaments={setTournaments} />} />

            <Route path="/leaderboard/:id" element={<Leaderboard />} />
            <Route path="/schedule/:id" element={<Schedule />} />

            <Route
              path="/organizer"
              element={
                currentUser && currentUser.role === 'organizer'
                  ? <OrganizerDashboard tournaments={tournaments} setTournaments={setTournaments} />
                  : <Navigate to="/login" replace />
              }
            />

            <Route path="/live-updates/:id" element={<LiveUpdates />} />
            <Route path="/prizes/:id" element={<PrizeDistribution />} />
            <Route path="/spectator/:id" element={<SpectatorView />} />

            <Route path="/login" element={<Login onLogin={handleLogin} onResetPassword={handleResetPassword} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />

            <Route
              path="/profile"
              element={
                currentUser ? (
                  <Profile
                    currentUser={currentUser}
                    invitations={invitations}
                    onRespondToInvitation={handleRespondToInvitation}
                    teams={teams}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/player-dashboard"
              element={
                currentUser && currentUser.role === "player"
                  ? <PlayerDashboard currentUser={currentUser} />
                  : <Navigate to="/login" />
              }
            />

            <Route
              path="/team-creation"
              element={
                <ProtectedRoute currentUser={currentUser}>
                  <TeamCreation
                    currentUser={currentUser}
                    onCreateTeam={handleCreateTeam}
                    users={users}
                  />
                </ProtectedRoute>
              }
            />

            <Route path="/test" element={<TestBackend />} />

            <Route
              path="/settings"
              element={
                currentUser ? (
                  <Settings
                    currentUser={currentUser}
                    onUpdatePassword={handleUpdatePassword}
                    onUpdateUsername={(newUsername) => {
                      setUsers(users.map(u =>
                        u.email === currentUser.email
                          ? { ...u, email: newUsername }
                          : u
                      ));
                      setCurrentUser({ ...currentUser, email: newUsername });
                    }}
                    onDeleteAccount={() => {
                      setUsers(users.filter(u => u.email !== currentUser.email));
                      setCurrentUser(null);
                    }}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* ORGANIZER TEAM MANAGEMENT */}
            <Route
              path="/organizer-teams"
              element={
                currentUser && currentUser.role === "organizer" ? (
                  <OrganizerTeams
                    teams={teams}
                    invitations={invitations}
                    onDeleteTeam={handleDeleteTeam}
                    onRefresh={() => {}}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/organizer-teams/:id"
              element={
                currentUser && currentUser.role === "organizer" ? (
                  <TeamDetails
                    teams={teams}
                    invitations={invitations}
                    onRespondToInvitation={handleRespondToInvitation}
                    onRemoveMember={handleRemoveMember}
                    tournaments={tournaments}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/organizer-teams/:id/edit"
              element={
                currentUser && currentUser.role === "organizer" ? (
                  <TeamEditor
                    teams={teams}
                    onUpdateTeam={handleUpdateTeam}
                    onSendInvitation={handleSendInvitation}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/organizer-invitations"
              element={
                currentUser && currentUser.role === "organizer" ? (
                  <InvitationsManager
                    invitations={invitations}
                    teams={teams}
                    onRespondToInvitation={handleRespondToInvitation}
                    onResendInvitation={handleResendInvitation}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/organizer-analytics"
              element={
                currentUser && currentUser.role === "organizer" ? (
                  <OrganizerAnalytics teams={teams} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
