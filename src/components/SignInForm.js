import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import "./SignInForm.css";

export default function SignInForm() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("email", JSON.stringify(data.user.email));
        localStorage.setItem("fullName", data.user.fullName); // Store first name
        localStorage.setItem("token", data.token);
        // localStorage.setItem("email", formData.email);
        // localStorage.setItem("phone", localStorage.getItem("phone_token"));
        // localStorage.setItem(
          // "aadharCard",
          // localStorage.getItem("aadharCard_token")
        // );
        alert("Login successfully!");
        navigate("/schemes");
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
    <>
      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8 my-1"
        style={{
          marginTop: "200px",
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="relative inline-block w-[70%] text-center mb-2 py-2  text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
            Sign in your account
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto flex items-center  sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="w-89 max-w-lg LoginFormCont p-10 space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-left text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
                {/* Forgot Password Link */}
                <div className="mt-1 text-center">
                  <span className="text-sm">
                    You can forgot your password.{" "}
                  </span>
                  <Link
                    to="/forgot-password"
                    className="text-1xl text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>

              <div className="flex items-center justify-center my-2">
                <span className="text-gray-600">or</span>
              </div>

              <Link
                to="/register"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
