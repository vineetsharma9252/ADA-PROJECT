import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import RegisterForm from './components/RegisterForm';
import SignInForm from './components/SignInForm';
import ApplicationForm from './components/ApplicationForm';
import NavBar from './components/NavBar';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const token = localStorage.getItem("Token"); // Check if the user is logged in

  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* Redirect to login if user is registered */}
        <Route path="/" element={token ? <Navigate to="/application-form" /> : <RegisterForm />} />
        {/* Redirect to application form if user is logged in */}
        <Route path="/login" element={token ? <Navigate to="/application-form" /> : <SignInForm />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </div>
  );
}

export default App;