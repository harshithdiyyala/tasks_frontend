import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/services';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      try {
        const data = await loginUser(username, password);
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.reload()  // Use navigate for redirection instead of reload
        } else {
          setError('Login failed');
        }
      } catch (err) {
        setError('Login failed');
      }
    } else {
      setError('Both fields are required');
    }
  };

  return (
    <div className="flex-center">
      <div className="form-container">
        <h1>TASKIFY</h1>
        <form onSubmit={handleLogin}>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Login</button>
          {error && <p>{error}</p>}
        </form>
        <div className="link-text">
          <p>Sample Credentials
            <br/>
            Username: abcd
            <br/>
            Password: abcde@123
          </p>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
