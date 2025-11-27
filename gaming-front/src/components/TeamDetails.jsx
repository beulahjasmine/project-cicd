// src/components/TeamDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

export default function TeamDetails({
  teams = [],
  invitations = [],
  onRespondToInvitation,
  onRemoveMember,
  tournaments = [],
}) {
  const { id } = useParams();
  const teamId = Number(id);
  const team = teams.find(t => t.id === teamId);

  if (!team) return <div>Team not found.</div>;

  const teamInvites = invitations.filter(inv => inv.teamId === teamId);

  return (
    <div>
      <h2>{team.name}</h2>
      <div style={{ marginBottom: 12 }}>
        <strong>Creator:</strong> {team.creator}
      </div>

      <section style={{ marginBottom: 20 }}>
        <h3>Members ({team.members?.length ?? 0})</h3>
        <ul>
          {team.members?.map((m, idx) => (
            <li key={m.email + idx} style={{ marginBottom: 6 }}>
              {m.email} {m.status ? `(${m.status})` : ""}{" "}
              <button
                onClick={() => {
                  if (window.confirm(`Remove member ${m.email} from ${team.name}?`)) {
                    onRemoveMember(teamId, m.email);
                  }
                }}
                style={{ marginLeft: 8, padding: "4px 8px" }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>Invitations</h3>
        {teamInvites.length === 0 ? (
          <p>No invitations.</p>
        ) : (
          <ul>
            {teamInvites.map(inv => (
              <li key={inv.id} style={{ marginBottom: 6 }}>
                {inv.invitedEmail} — {inv.status}
                {inv.status === "pending" && (
                  <>
                    <button onClick={() => onRespondToInvitation(inv.id, "accepted")} style={{ marginLeft: 8 }}>Accept</button>
                    <button onClick={() => onRespondToInvitation(inv.id, "rejected")} style={{ marginLeft: 8 }}>Reject</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>Tournament Participation</h3>
        <p>
          Your current team schema doesn't store participation. Use the organizer dashboard to
          link teams to tournaments or track results externally. (You may extend the team model later.)
        </p>

        <div style={{ marginTop: 12 }}>
          <Link to="/organizer-teams" style={{ textDecoration: "none", padding: "8px 12px", border: "1px solid #ccc", borderRadius: 4 }}>
            Back to Teams
          </Link>
        </div>
      </section>
    </div>
  );
}
