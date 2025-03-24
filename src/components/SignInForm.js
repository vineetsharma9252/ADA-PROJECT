import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignInForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Invalid email format.");
      return false;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:4500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Important for cookies if used
      });

      if (response.ok) {
        const data = await response.json();

        alert("Login successfully!");
        navigate("/");
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form");
    }
  };

  return (
    <div className="container mx-auto">
      <div
        className="flex min-h-full flex-1 hover:border-green-900 mx-auto flex-col lg:flex-row justify-center px-4 py-1 lg:px-6 lg:py-2 my-1 sm:my-2"
        style={{ marginTop: "200px" }}
      >
        <div className="sm:mx-auto sm:w-full my-auto sm:max-w-sm">
          <h2 className="relative inline-block w-[70%] text-center mb-2 py-2 text-black text-4xl font-bold">
            Sign in your account
          </h2>
          <p className="hidden lg:block text-gray-700 text-center mt-2">
            Welcome to Ajmer Development Authority's official portal. Sign in to
            access and manage your applications and services efficiently.
          </p>
        </div>

        <div className="mt-2 sm:mx-auto flex items-center sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="w-89 max-w-lg LoginFormCont p-10 space-y-6 border border-gray-300 rounded-lg shadow-lg"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-left text-gray-900"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-left font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300"
              />
              <div className="mt-1 text-center">
                <span className="text-sm">You can forgot your password. </span>
                <Link
                  to="/forgot-password"
                  className="text-1xl text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Login
              </button>
              <div className="flex items-center justify-center my-2">
                <span className="text-gray-600">or</span>
              </div>
              <Link
                to="/register"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-500"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
