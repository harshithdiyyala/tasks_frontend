import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/services';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword,setShowPasword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      try {
        const data = await registerUser(username, password);
        if (data.message) {
          navigate('/login');  // Redirect to login on successful registration
        } else {
          setError('Signup failed: ' + data.error);  // Use error from response if available
        }
      } catch (err) {
        setError('Signup failed');
      }
    } else {
      setError('Both fields are required');
    }
  };

  return (
    <div className="flex-center">
      <div className="form-container">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
          <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <div className='flex-start'><input type ="checkbox" id='showpwd' onChange={() => setShowPasword(!showPassword)}/> <label htmlFor='showpwd'> Show Password</label></div>

          <button type="submit">Signup</button>
          {error && <p>{error}</p>}
        </form>
        <div className="link-text">
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
