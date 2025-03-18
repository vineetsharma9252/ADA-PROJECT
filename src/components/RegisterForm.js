import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();

  const initialFormState = {
    fullName: "",
    gender: "",
    father_name: "",
    dob: "",
    email: "",
    password: "",
    phone: "",
    marital_status: "",
    caste: "",
    curr_address: "",
    perm_address: "",
    aadharCard: "",
    panCard: "",
    voterId: "",
    occupation: "",
    income: "",
    education: "",
    disability: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Add reCAPTCHA site key here (correct one)
  const sitekey = "6LerCfYqAAAAAI7UbOn7tylVu9_sjtSQeAQtEOCR";

  // Add Google reCAPTCHA script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Captcha Callbacks
  useEffect(() => {
    window.onCaptchaSuccess = () => setCaptchaVerified(true);
    window.onCaptchaExpired = () => setCaptchaVerified(false);
  }, []);

  // Validate individual fields
  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "fullName":
        if (!/^[A-Za-z\s]+$/.test(value.trim())) message = "Only letters allowed.";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value.trim())) message = "Invalid email address.";
        break;
      case "password":
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@%_])[A-Za-z\d@%_]{6,}$/.test(value.trim()))
          message = "Password must have uppercase, lowercase, number, and (@, %, _).";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value.trim())) message = "Phone must be 10 digits.";
        break;
      case "aadharCard":
        if (!/^\d{12}$/.test(value.trim())) message = "Aadhar must be 12 digits.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    validateField(name, value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear any previous error messages
    setErrors({});
    
    // Check if CAPTCHA is verified
    if (!captchaVerified) {
      alert("Please verify CAPTCHA.");
      return;
    }
  
    // Validate required fields
    const requiredFields = ["fullName", "email", "password", "aadharCard", "phone"];
    let formIsValid = true;
    const newErrors = {};
  
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = "This field is required";
        formIsValid = false;
      } else if (errors[field]) {
        formIsValid = false;
      }
    });
  
    // If form is invalid, show errors and return
    if (!formIsValid) {
      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
      alert("Fix form errors before submitting.");
      return;
    }
  
    // Get the reCAPTCHA token
    const captchaToken = window.grecaptcha.getResponse();
  
    if (!captchaToken) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }
  
    try {
      // Show loading message (Optional)
      console.log("Submitting form...");
  
      // Send form data to backend
      const response = await fetch("http://localhost:4500/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      });
  
      // Check backend response
      if (response.ok) {
        const data = await response.json();
        console.log("Success Response:", data);
  
        // Store user data and reset form
        localStorage.setItem("user", JSON.stringify(data.result));
        alert("Registration successful!");
  
        // Reset form and CAPTCHA
        setFormData(initialFormState);
        window.grecaptcha.reset();
        setCaptchaVerified(false);
  
        // Navigate to login page
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        alert(errorData.message || "Registration failed due to server error.");
      }
    } catch (error) {
      console.error("Network or Submission error:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };
  

  return (
    <div className="flex min-h-full flex-col justify-center mainBody px-6 py-7 lg:px-8 my-2 w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-full">
        <h2 className="relative inline-block w-[65%] text-center py-2 text-black text-2xl font-bold">
          Create your account
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white regFormCont mx-auto px-6 py-8 mt-5 w-full max-w-[90%] space-y-6 sm:max-w-[80%]"
      >
        {/** Full Name */}
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        {/** Email */}
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/** Password */}
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/** Phone Number */}
        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          maxLength="10"
        />

        {/** Aadhar Card */}
        <InputField
          label="Aadhar Number"
          name="aadharCard"
          value={formData.aadharCard}
          onChange={handleChange}
          error={errors.aadharCard}
          maxLength="12"
        />

        {/** CAPTCHA */}
        <div className="g-recaptcha" data-sitekey={sitekey} data-callback="onCaptchaSuccess" data-expired-callback="onCaptchaExpired"></div>

        {/** Buttons */}
        <div className="space-y-4 text-center w-full">
          <button
            type="submit"
            className="w-full justify-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Register
          </button>
          <div className="flex items-center justify-center">
            <span className="text-gray-500">or</span>
          </div>
          <Link
            to="/login"
            className="block w-full text-center rounded-md bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

// Reusable InputField Component
const InputField = ({ label, name, value, onChange, error, type = "text", maxLength }) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-left text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2"
      aria-invalid={!!error}
      aria-describedby={`${name}Error`}
      maxLength={maxLength}
    />
    {error && (
      <p id={`${name}Error`} className="text-red-500 text-left text-xs mt-1">
        {error}
      </p>
    )}
  </div>
);

export default RegisterForm;
