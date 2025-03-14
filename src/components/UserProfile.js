import React, { useState, useEffect } from "react";
import UserPage from "./UserPage";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCurrentPermanent, setIsCurrentPermanent] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState({
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
    disablity: "",
  });

  const handleAddress = (e) => {
    const isSame = e.target.value === "yes";
    setIsCurrentPermanent(isSame);
    if (isSame) {
      setUser((prevUser) => ({
        ...prevUser,
        curr_address: prevUser.perm_address,
      }));
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4500/user-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // user object should contain all input fields' data
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      setSuccess("Data saved successfully!");
      setError("");
      alert("Profile Updated Successfully!");
      setIsUserCreated(true);
      navigate(`/user-profile-2/api/data/${user.email}`); // Correct path if it matches backend route
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error submitting form. Please try again.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div
        className="w-full max-w-2xl p-8 shadow-lg bg-white rounded-lg relative"
        style={{
          height: "650px",
        }}
      >
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold text-left mb-4">User Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-left my-3">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={localStorage.getItem("fullName")}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-sm font-medium text-left my-3">
                Gender
              </label>
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-left my-3"
              >
                DoB
              </label>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-left my-3"
              >
                Father's Name
              </label>
              <input
                type="text"
                name="fathers_name"
                value={user.fathers_name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                onClick={nextStep}
                type="button"
                className="mt-4 w-full p-2 bg-blue-500 text-white rounded my-3"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-left">Contact Details</div>
              <label className="block text-sm font-medium text-left my-3">
                Permanent Address
              </label>
              <input
                type="text"
                name="perm_address"
                value={user.perm_address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-left"
                required
              />
              <label
                htmlFor=""
                className="block text-sm font-medium text-left my-3"
              >
                <br />
                Is Current Address Same as Permanent Address?
              </label>
              <div className="block text-sm font-medium text-left my-3">
                <label>
                  <input
                    type="radio"
                    name="isCurrentPermanent"
                    value="yes"
                    checked={isCurrentPermanent}
                    onChange={handleAddress}
                  />{" "}
                  Yes{" "}
                </label>
                <label>
                  <input
                    type="radio"
                    name="isCurrentPermanent"
                    value="no"
                    checked={!isCurrentPermanent}
                    onChange={handleAddress}
                  />{" "}
                  No
                </label>
              </div>
              <label className="block text-sm font-medium text-left my-2">
                Current Address
              </label>
              <input
                type="text"
                name="curr_address"
                value={user.curr_address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
                readOnly={isCurrentPermanent}
              />

              <label className="block text-sm font-medium text-left my-2">
                Phone Number
              </label>
              <input
                type="number"
                name="phone"
                value={localStorage.getItem("phone_token")}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-sm font-medium text-left">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={localStorage.getItem("email_token")}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <button
                onClick={prevStep}
                type="button"
                className="mt-4 p-2 bg-gray-400 text-white rounded mr-2"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                type="button"
                className="p-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-left my-3"
              >
                {" "}
                Identity Proofs{" "}
              </label>
              <label className="block text-sm font-medium text-left my-3">
                Aadhaar Number
              </label>
              <input
                type="text"
                name="aadharCard"
                value={localStorage.getItem("aadharCard_token")}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                requireds
              />
              <label className="block text-sm font-medium text-left my-3">
                PAN number
              </label>
              <input
                type="text"
                name="panCard"
                value={user.panCard}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-sm font-medium text-left my-3">
                Voter ID
              </label>
              <input
                type="text"
                name="voterId"
                value={user.voterId}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded "
                required
              />
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "40%",
                }}
              >
                <button
                  onClick={prevStep}
                  type="button"
                  className="mt-4 p-2 bg-gray-400 text-white rounded mr-2"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  type="button"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <label className="block text-sm font-medium text-left my-3">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={user.occupation}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <label className="block text-sm font-medium text-left my-3">
                Income Group
              </label>
              <div className="text-left">
                <select
                  name="income"
                  value={user.income}
                  onChange={handleChange}
                >
                  <option value="100000">below one lakh</option>
                  <option value="100000-200000">1L-2L</option>
                  <option value="200000-500000">2L-5L</option>
                  <option value="500000-1000000">5L-10L</option>
                  <option value="10000000">10L+</option>
                </select>
              </div>
              <label className="block text-sm font-medium text-left my-3">
                Highest Education
              </label>
              <input
                type="text"
                name="education"
                value={user.education}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "40%",
                }}
              >
                <button
                  onClick={prevStep}
                  type="button"
                  className="mt-4 p-2 bg-gray-400 text-white rounded mr-2"
                >
                  Back
                </button>
                <button
                  onClick={nextStep}
                  type="button"
                  className="p-2 bg-blue-500 text-white rounded"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <label className="block text-sm font-medium text-left my-3">
                Caste{" "}
              </label>
              <div className="text-left">
                <select name="caste" value={user.caste} onChange={handleChange}>
                  <option value="general">General</option>
                  <option value="obc">OBC</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                </select>
              </div>
              <label className="block text-sm font-medium text-left my-3">
                Disable
              </label>
              <div className="text-left">
                <input
                  type="radio"
                  name="disablity"
                  value="yes"
                  checked={user.disablity === "yes"}
                  onChange={handleChange}
                  style={{
                    marginLeft: "10px",
                  }}
                />
                <label
                  htmlFor="disability_yes"
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Yes
                </label>
                <input
                  type="radio"
                  name="disability"
                  value="no"
                  checked={user.disability === "no"}
                  onChange={handleChange}
                  style={{
                    marginLeft: "10px",
                  }}
                />
                <label
                  htmlFor="disability_no"
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  No
                </label>
              </div>
              <br />
              <label
                htmlFor="marital_status"
                className="block text-sm font-medium text-left "
                style={{
                  fontSize: "20px",
                }}
              >
                Marital Status
              </label>
              <br />
              <div className="text-left">
                <input
                  type="radio"
                  value="Married"
                  name="marital_status"
                  checked={user.marital_status === "Married"}
                  onChange={handleChange}
                />
                <label
                  htmlFor="maritalstatus"
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Married
                </label>
                <input
                  type="radio"
                  value="Unmarried"
                  name="marital_status"
                  checked={user.marital_status === "Unmarried"}
                  onChange={handleChange}
                  style={{
                    marginLeft: "20px",
                  }}
                />
                <label
                  htmlFor="maritalstatus"
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  Unmarried
                </label>
              </div>
              <br />
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  left: "40%",
                }}
              >
                <button
                  onClick={prevStep}
                  type="button"
                  className="mt-4 p-2 bg-gray-400 text-white rounded mr-2"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="p-2 bg-green-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>

        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
