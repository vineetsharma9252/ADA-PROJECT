import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    mobile: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "firstName":
        if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          message = "First Name should contain only letters.";
        }
        break;

      case "email":
        if (!/\S+@\S+\.\S+/.test(value.trim())) {
          message = "Invalid email address.";
        }
        break;

      case "password":
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%_])[A-Za-z\d@%_]{6,}$/.test(
            value.trim()
          )
        ) {
          message =
            "Password must be at least 6 characters and include uppercase, lowercase, number, and (@, %, _).";
        }
        break;

      case "mobile":
        if (!/^\d{10}$/.test(value.trim())) {
          message = "Mobile number must be 10 digits.";
        }
        break;

      case "aadhar":
        if (!/^\d{12}$/.test(value.trim())) {
          message = "Aadhar number must be 12 digits.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message })); // Dynamic error setting
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data
    validateField(name, value); // Validate current field dynamically
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final form-level validation check before submit
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (formData[field].trim() === "" || errors[field]) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please correct the errors in the form.");
      return;
    }

    // If valid, proceed to submit
    try {
      let response = await fetch("http://localhost:4500/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        response = await response.json();
        localStorage.setItem("user", JSON.stringify(response.result));
        alert("Form submitted successfully!");
        setFormData({
          firstName: "",
          email: "",
          password: "",
          mobile: "",
          aadhar: "",
        });
        setErrors({});
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Error submitting the form:", errorData.message);
        alert("Failed to submit the form");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form");
    }
  };

  return (
    <div
      className="flex min-h-full flex-col bg-gray-100  justify-center px-6 py-7 lg:px-8 my-2"
      style={{
        marginTop: "150px",
      }}
    >
      <div
        className="sm:mx-auto sm:w-full sm:max-w-sm"
        style={{
          marginTop: "80px",
        }}
      >
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <form
        action="/create"
        onSubmit={handleSubmit}
        method="POST"
        className="bg-white shadow-md mx-auto rounded-lg px-10 py-8 mt-5 w-full max-w-[80%] space-y-6"
      >
        {/* First Name */}
        <label
          htmlFor="Name"
          className="block text-left text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
          className="block w-full rounded-md border px-4 py-2"
        />
        {errors.firstName && (
          <p className="text-red-500 text-left text-xs mt-1">
            {errors.firstName}
          </p>
        )}

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-left text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-left text-sm">{errors.password}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="space-y-2">
          <label
            htmlFor="mobile"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="Enter your mobile number"
            maxLength="10"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.mobile && (
            <p className="text-red-500 text-left text-sm">{errors.mobile}</p>
          )}
        </div>

        {/* Aadhar Number */}
        <div className="space-y-2">
          <label
            htmlFor="aadhar"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Aadhar Number
          </label>
          <input
            type="text"
            name="aadhar"
            id="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            required
            placeholder="Enter your Aadhar number"
            maxLength="12"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          />
          {errors.aadhar && (
            <p className="text-red-500 text-left text-sm">{errors.aadhar}</p>
          )}
        </div>

        {/* Submit and Login */}
        <div className="space-y-4 text-center">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Register
          </button>

          <div className="flex items-center justify-center">
            <span className="text-gray-500">or</span>
          </div>

          <Link
            to="/login"
            className="inline-flex justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
