import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css'

const App = () => {
  // Check for token and decide redirection based on it
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        

        
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />}/>
          </>
        ) : (
          <>
          <Route path="*" element={<Navigate to="/home" />}/>
          <Route path ="/home" element ={<Home/>} />
          </>
        )}

        
      </Routes>
    </Router>
  );
};

export default App;
