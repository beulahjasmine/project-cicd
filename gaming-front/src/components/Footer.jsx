import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "#007bff",
        color: "#ffffff",
        padding: "20px",
        textAlign: "center",
        marginTop: "40px",
        borderTop: "1px solid #0056b3",
      }}
    >
      <p style={{ margin: "5px 0", fontSize: "1rem" }}>
        © {new Date().getFullYear()} GamingPortal. All Rights Reserved.
      </p>

      <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
        Powered by Gaming Tournament Portal
      </p>
    </footer>
  );
}

export default Footer;
