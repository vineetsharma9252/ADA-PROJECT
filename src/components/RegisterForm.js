import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCaptcha from "react-google-recaptcha";
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
  const sitekey = "6Ldh4vUqAAAAAHz0JNVnVR9b9Yk2XMO3v_c9vaoi";

  useEffect(() => {
    window.onCaptchaSuccess = onCaptchaSuccess;
    window.onCaptchaExpired = onCaptchaExpired;
  }, []);

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "fullName":
        if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          message = "Full Name should contain only letters.";
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

      case "phone":
        if (!/^\d{10}$/.test(value.trim())) {
          message = "Phone number must be 10 digits.";
        }
        break;

      case "aadharCard":
        if (!/^\d{12}$/.test(value.trim())) {
          message = "Aadhar number must be 12 digits.";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    validateField(name, value);
  };

  const onCaptchaSuccess = () => {
    setCaptchaVerified(true);
  };

  const onCaptchaExpired = () => {
    setCaptchaVerified(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert("Please verify that you are not a robot.");
      return;
    }

    const requiredFields = [
      "fullName",
      "email",
      "password",
      "aadharCard",
      "phone",
    ];

    let isValid = true;
    requiredFields.forEach((field) => {
      validateField(field, formData[field]);
      if (formData[field].trim() === "" || errors[field]) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert("Please correct the errors in the form.");
      return;
    }

    const captchaToken = window.grecaptcha.getResponse();

    try {
      let response = await fetch("http://localhost:4500/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      if (response.ok) {
        response = await response.json();
        localStorage.setItem("user", JSON.stringify(response.result));
        alert("Form submitted successfully!");
        setFormData(initialFormState);
        setErrors({});
        window.grecaptcha.reset();
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
    <div className="flex min-h-full flex-col justify-center mainBody px-6 py-7 lg:px-8 my-2 w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-full">
        <h2 className="relative inline-block w-[65%] text-center py-2 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
          Create your account
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white regFormCont mx-auto px-6 py-8 mt-5 w-full max-w-[90%] space-y-6 sm:max-w-[80%]"
      >
        {/* Form Fields */}
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="block w-full rounded-md border px-4 py-2"
            aria-invalid={!!errors.fullName}
            aria-describedby="fullNameError"
          />
          {errors.fullName && (
            <p
              id="fullNameError"
              className="text-red-500 text-left text-xs mt-1"
            >
              {errors.fullName}
            </p>
          )}
        </div>

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
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2"
            aria-invalid={!!errors.email}
            aria-describedby="emailError"
          />
          {errors.email && (
            <p id="emailError" className="text-red-500 text-left text-sm">
              {errors.email}
            </p>
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
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2"
            aria-invalid={!!errors.password}
            aria-describedby="passwordError"
          />
          {errors.password && (
            <p id="passwordError" className="text-red-500 text-left text-sm">
              {errors.password}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            maxLength="10"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2"
            aria-invalid={!!errors.phone}
            aria-describedby="phoneError"
          />
          {errors.phone && (
            <p id="phoneError" className="text-red-500 text-left text-sm">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Aadhar Number */}
        <div className="space-y-2">
          <label
            htmlFor="aadharCard"
            className="block text-left text-sm font-medium text-gray-700"
          >
            Aadhar Number
          </label>
          <input
            type="text"
            name="aadharCard"
            id="aadharCard"
            value={formData.aadharCard}
            onChange={handleChange}
            required
            placeholder="Enter your Aadhar number"
            maxLength="12"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2"
            aria-invalid={!!errors.aadharCard}
            aria-describedby="aadharCardError"
          />
          {errors.aadharCard && (
            <p id="aadharCardError" className="text-red-500 text-left text-sm">
              {errors.aadharCard}
            </p>
          )}
        </div>

        {/* CAPTCHA */}

        {/* <ReCaptcha sitekey="6LerCfYqAAAAAI7UbOn7tylVu9_sjtSQeAQtEOCR" /> */}

        <div>
          <div
            className="g-recaptcha"
            data-sitekey="6LerCfYqAAAAAI7UbOn7tylVu9_sjtSQeAQtEOCR"
            data-callback="onCaptchaSuccess"
            data-expired-callback="onCaptchaExpired"
          ></div>
        </div>
        {/* Buttons */}
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

export default RegisterForm;
