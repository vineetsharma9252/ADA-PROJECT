import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import SignInForm from "./components/SignInForm";
import ApplicationForm from "./components/ApplicationForm";
import NavBar from "./components/NavBar";
import ForgotPassword from "./components/ForgotPassword";
import About from "./components/About";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard";
import SchemePage from "./components/SchemePage";
import UserProfile from "./components/UserProfile";

function App() {
  const token = localStorage.getItem("token"); // ✅ Consistent lowercase

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/register"
          element={token ? <Navigate to="/application-form" /> : <RegisterForm />}
        />

        <Route
          path="/login"
          element={token ? <Navigate to="/schemes" /> : <SignInForm />}
        />

        <Route path="/about" element={<About />} />

        <Route
          path="/application-form"
          element={
            <ProtectedRoute>
              <ApplicationForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/application-form/:schemeName"
          element={
            <ProtectedRoute>
              <ApplicationForm />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/schemes" element={<SchemePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default App;
