import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, onResetPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgetMode, setForgetMode] = useState(false); // Toggle forget password mode
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null); // Store generated OTP
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin(email, password)) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleForgetPassword = () => {
    setForgetMode(true);
    setError('');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Mock: Check if email exists (in real app, send OTP via email)
    if (!resetEmail) {
      setError('Please enter your email');
      return;
    }
    const otpCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    setGeneratedOtp(otpCode);
    console.log(`OTP for ${resetEmail}: ${otpCode}`); // Log to console as requested
    setError('');
    alert('OTP sent! Check the console (F12) for the code.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (parseInt(otp) === generatedOtp) {
      onResetPassword(resetEmail, newPassword);
      setError('');
      alert('Password reset successful! You are now logged in.');
      navigate('/');
    } else {
      setError('Invalid OTP');
    }
  };

  if (forgetMode) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#ffffff' }}>
        <form onSubmit={generatedOtp ? handleResetPassword : handleSendOtp} style={{ maxWidth: '450px', width: '100%', padding: '30px', background: '#f9f9f9', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000000' }}>Reset Password</h2>
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>}
          
          {!generatedOtp ? (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000000' }}>Email</label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', fontSize: '16px' }}
                />
              </div>
              <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: '#ffffff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Send OTP</button>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000000' }}>OTP</label>
                <input
                  type="text"
                  placeholder="Enter the OTP from console"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', fontSize: '16px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000000' }}>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', fontSize: '16px' }}
                />
              </div>
              <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: '#ffffff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Reset Password</button>
            </>
          )}
          
          <p style={{ textAlign: 'center', marginTop: '15px', color: '#000000' }}>
            <button type="button" onClick={() => setForgetMode(false)} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>Back to Login</button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', background: '#ffffff' }}>
      <form onSubmit={handleLogin} style={{ maxWidth: '450px', width: '100%', padding: '30px', background: '#f9f9f9', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000000' }}>Login</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{error}</p>}
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000000' }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', fontSize: '16px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000000' }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', fontSize: '16px' }}
          />
        </div>
        
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: '#ffffff', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Login</button>
        
        <p style={{ textAlign: 'center', marginTop: '15px', color: '#000000' }}>
          <button type="button" onClick={handleForgetPassword} style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>Forget Password?</button>
        </p>
        <p style={{ textAlign: 'center', marginTop: '10px', color: '#000000' }}>
          Don't have an account? <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;