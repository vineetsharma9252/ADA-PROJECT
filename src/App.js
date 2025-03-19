import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
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
import ResetPassword from "./components/ResetPassword";
// import Footer from "./components/Footer";
import UserPage from "./components/UserPage";
import { LogIn } from "lucide-react";

import ProjectPage from "./components/ProjectPage";

function App() {
  const token = localStorage.getItem("token"); // ✅ Consistent lowercase

  const isLoggedIn = token && token !== "null" && token !== "undefined";

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={token ? <Navigate to="/login" /> : <RegisterForm />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <SignInForm />}
        />{" "}
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <SignInForm />}
        />
        <Route path="/about" element={<About />} />
        {/* <Route path="/login" element={<SignInForm />} /> */}
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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/schemes" element={<SchemePage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* ✅ Corrected Route with useParams */}
        <Route path="/user-page" element={<UserPage />} />
    
        <Route path="/projects" element={<ProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
