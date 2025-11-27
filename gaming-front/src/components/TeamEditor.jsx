// src/components/TeamEditor.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TeamEditor({ teams = [], onUpdateTeam, onSendInvitation }) {
  const { id } = useParams();
  const teamId = Number(id);
  const team = teams.find(t => t.id === teamId);
  const navigate = useNavigate();

  const [name, setName] = useState(team?.name ?? "");
  const [inviteEmail, setInviteEmail] = useState("");

  if (!team) return <div>Team not found.</div>;

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Team name cannot be empty.");
    onUpdateTeam(teamId, { name: name.trim() });
    navigate(`/organizer-teams/${teamId}`);
  };

  const sendInvite = () => {
    if (!inviteEmail.trim()) return;
    onSendInvitation(teamId, inviteEmail.trim());
    setInviteEmail("");
    alert("Invitation queued (pending).");
  };

  return (
    <div>
      <h2>Edit Team: {team.name}</h2>

      <form onSubmit={submit} style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <label>Team Name</label><br />
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 8, width: "100%" }} />
        </div>

        <button type="submit" style={{ padding: "8px 12px" }}>Save</button>
      </form>

      <section style={{ marginTop: 16 }}>
        <h3>Send Invitation</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="player@example.com" style={{ padding: 8, flex: 1 }} />
          <button onClick={sendInvite} style={{ padding: "8px 12px" }}>Send</button>
        </div>
      </section>
    </div>
  );
}
