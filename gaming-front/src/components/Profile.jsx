import React, { useState } from "react";

function Profile({
  currentUser,
  invitations,
  onRespondToInvitation,
  teams,
  onUpdateUsername,
  onUpdatePassword,
  onDeleteAccount,
}) {
  const [newUsername, setNewUsername] = useState(currentUser?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!currentUser) {
    return <p>Please log in to view your profile.</p>;
  }

  const userInvitations = invitations.filter(
    (inv) => inv.invitedEmail === currentUser.email && inv.status === "pending"
  );

  const userTeams = teams.filter((team) =>
    team.members.some((m) => m.email === currentUser.email && m.status === "accepted")
  );

  const handleSave = () => {
    let changed = false;

    if (newUsername !== currentUser.email) {
      onUpdateUsername(newUsername);
      changed = true;
    }

    if (newPassword.trim() !== "") {
      onUpdatePassword(newPassword);
      changed = true;
    }

    setMessage(changed ? "Profile updated successfully!" : "No changes made.");
    setNewPassword("");
  };

  const leaveTeam = (teamId) => {
    alert("Leaving teams is not wired to backend yet, but button works!");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Your Profile</h2>

        <label style={styles.label}>Email / Username</label>
        <input
          style={styles.input}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <label style={styles.label}>New Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {message && <p style={styles.message}>{message}</p>}

        <button style={styles.primaryBtn} onClick={handleSave}>
          Save Changes
        </button>

        {/* Invitations */}
        <h3 style={styles.sectionTitle}>Team Invitations</h3>
        {userInvitations.length === 0 ? (
          <p>No pending invitations.</p>
        ) : (
          userInvitations.map((inv) => {
            const team = teams.find((t) => t.id === inv.teamId);
            return (
              <div key={inv.id} style={styles.inviteBox}>
                <p>
                  Team: <strong>{team?.name || "Unknown"}</strong> <br />
                  From: {team?.creator}
                </p>

                <button
                  style={styles.acceptBtn}
                  onClick={() => onRespondToInvitation(inv.id, "accepted")}
                >
                  Accept
                </button>

                <button
                  style={styles.rejectBtn}
                  onClick={() => onRespondToInvitation(inv.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            );
          })
        )}

        {/* Teams */}
        <h3 style={styles.sectionTitle}>Your Teams</h3>
        {userTeams.length === 0 ? (
          <p>You are not part of any teams yet.</p>
        ) : (
          userTeams.map((team) => (
            <div key={team.id} style={styles.teamBox}>
              <p>
                {team.name}  
                <br />
                Members: {team.members.map((m) => m.name).join(", ")}
              </p>
              <button style={styles.leaveBtn} onClick={() => leaveTeam(team.id)}>
                Leave Team
              </button>
            </div>
          ))
        )}

        {/* Danger Zone */}
        <button style={styles.deleteBtn} onClick={onDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "white",
    padding: "40px 0",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "450px",
    background: "white",
    border: "2px solid #1e90ff",
    borderRadius: "10px",
    padding: "25px",
  },
  heading: {
    textAlign: "center",
    color: "black",
    marginBottom: "20px",
  },
  sectionTitle: {
    marginTop: "25px",
    color: "black",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #1e90ff",
  },
  inviteBox: {
    padding: "10px",
    border: "1px solid #1e90ff",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  teamBox: {
    padding: "10px",
    border: "1px solid #1e90ff",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  primaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#1e90ff",
    border: "none",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  acceptBtn: {
    padding: "5px 10px",
    background: "#1e90ff",
    color: "white",
    border: "none",
    borderRadius: "3px",
    cursor: "pointer",
    marginRight: "10px",
  },
  rejectBtn: {
    padding: "5px 10px",
    background: "white",
    color: "red",
    border: "1px solid red",
    borderRadius: "3px",
    cursor: "pointer",
  },
  leaveBtn: {
    marginTop: "10px",
    padding: "5px 10px",
    background: "white",
    border: "1px solid #1e90ff",
    borderRadius: "3px",
    cursor: "pointer",
  },
  deleteBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "10px",
    background: "white",
    color: "red",
    border: "1px solid red",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    color: "green",
    margin: "5px 0 10px 0",
  },
};

export default Profile;
