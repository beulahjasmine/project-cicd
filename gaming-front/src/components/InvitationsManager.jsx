// src/components/InvitationsManager.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function InvitationsManager({ invitations = [], teams = [], onRespondToInvitation, onResendInvitation }) {
  const pending = invitations.filter(i => i.status === "pending");

  return (
    <div>
      <h2>Invitations</h2>

      {pending.length === 0 ? (
        <p>No pending invitations.</p>
      ) : (
        <ul>
          {pending.map(inv => {
            const team = teams.find(t => t.id === inv.teamId);
            return (
              <li key={inv.id} style={{ marginBottom: 8 }}>
                {inv.invitedEmail} — invited to <strong>{team?.name ?? "Unknown team"}</strong>
                <div style={{ display: "inline-block", marginLeft: 8 }}>
                  <button onClick={() => onRespondToInvitation(inv.id, "accepted")} style={{ marginRight: 6 }}>Accept</button>
                  <button onClick={() => onRespondToInvitation(inv.id, "rejected")} style={{ marginRight: 6 }}>Reject</button>
                  <button onClick={() => onResendInvitation(inv.id)}>Resend</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div style={{ marginTop: 12 }}>
        <Link to="/organizer-teams">Back to Teams</Link>
      </div>
    </div>
  );
}
