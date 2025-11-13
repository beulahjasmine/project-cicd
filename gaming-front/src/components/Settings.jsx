import React, { useState } from "react";

function Settings({ currentUser, onUpdatePassword, onUpdateUsername, onDeleteAccount }) {
  const [username, setUsername] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!password && username === currentUser.email) {
      setMessage("No changes made.");
      return;
    }

    if (username !== currentUser.email) {
      onUpdateUsername(username);
    }

    if (password) {
      onUpdatePassword(password);
    }

    setMessage("Settings updated successfully!");
    setPassword("");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account? This cannot be undone.")) {
      onDeleteAccount();
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Account Settings</h2>

        <label style={styles.label}>Email / Username</label>
        <input
          style={styles.input}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label style={styles.label}>New Password</label>
        <input
          style={styles.input}
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {message && <p style={styles.message}>{message}</p>}

        <button style={styles.saveBtn} onClick={handleSave}>
          Save Changes
        </button>

        <button style={styles.deleteBtn} onClick={handleDelete}>
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
    display: "flex",
    justifyContent: "center",
    paddingTop: "40px",
  },
  card: {
    width: "400px",
    background: "#ffffff",
    border: "2px solid #1e90ff",
    borderRadius: "10px",
    padding: "25px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#000",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #1e90ff",
    borderRadius: "5px",
    marginBottom: "15px",
  },
  saveBtn: {
    width: "100%",
    padding: "10px",
    background: "#1e90ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  deleteBtn: {
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
    marginBottom: "10px",
  },
};

export default Settings;
