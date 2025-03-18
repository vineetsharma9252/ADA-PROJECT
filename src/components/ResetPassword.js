import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Password validation function
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[@_\-])(?=.*\d)[A-Za-z\d@_\-]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password strength validation
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, include at least 1 uppercase letter, 1 number, and 1 special character (@, _, -)."
      );
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // If validation passes, reset error and proceed
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:4500/reset-password",
        { token, password }
      );

      Swal.fire({
        icon: "success",
        title: "Password Reset Successfully",
        text: "You can now login with your new password.",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/login")); // Redirect to login page
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6  shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Reset Password
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
