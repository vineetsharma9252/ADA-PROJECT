import React, { useState } from "react";
import DOMPurify from "dompurify"; // Prevents XSS attacks
import { useParams, useNavigate } from "react-router-dom";
import "./ApplicationForm.css";

export default function ApplicationForm() {
  const navigate = useNavigate();
  const { schemeName } = useParams();
  const decodedSchemeName = decodeURIComponent(schemeName);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    incomeGroup: "Under 500,000",
    plot: "Plot A",
    category: "General",
    paymentAmount: "",
  });

  const [familyMembers, setFamilyMembers] = useState([]);
  const [member, setMember] = useState({ name: "", mobile: "", aadhar: "" });

  // Utility functions for validation
  const isValidName = (name) => /^[A-Z\s]+$/.test(name);
  const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const isValidAadhar = (aadhar) => /^\d{12}$/.test(aadhar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const upperValue = value.toUpperCase(); // Convert to uppercase
    const sanitizedValue = DOMPurify.sanitize(upperValue);

    if (["FIRSTNAME", "MIDDLENAME", "LASTNAME"].includes(name.toUpperCase())) {
      if (!isValidName(sanitizedValue) && sanitizedValue !== "") {
        alert("Only alphabets and spaces are allowed in Name fields.");
        return;
      }
    }

    setFormData({ ...formData, [name]: sanitizedValue });
  };

  const handleAddMember = () => {
    if (!member.name || !member.mobile || !member.aadhar) {
      alert("All fields are required for family members.");
      return;
    }

    if (!isValidName(member.name)) {
      alert("Family member's name must contain only alphabets.");
      return;
    }

    if (!isValidMobile(member.mobile)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!isValidAadhar(member.aadhar)) {
      alert("Aadhar number must be 12 digits.");
      return;
    }

    setFamilyMembers([
      ...familyMembers,
      {
        name: DOMPurify.sanitize(member.name.toUpperCase()),
        mobile: DOMPurify.sanitize(member.mobile),
        aadhar: DOMPurify.sanitize(member.aadhar),
      },
    ]);

    setMember({ name: "", mobile: "", aadhar: "" });
  };

  const handleDeleteMember = (index) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, familyMembers };

    const token = localStorage.getItem("token"); // Assuming token is stored directly

    try {
      const response = await fetch("http://localhost:4500/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token, // Pass token directly without Bearer
          // OR "x-auth-token": token if you prefer custom header
        },
        body: JSON.stringify(finalData),
      });

      const responseData = await response.json();

      if (response.status === 401) {
        // Redirect on Unauthorized
        alert("Unauthorized! Please login to continue.");
        navigate("/login");
        return;
      }

      if (response.ok) {
        alert("Application submitted successfully!");
        // Reset form
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          incomeGroup: "Under 500,000",
          plot: "Plot A",
          category: "General",
          paymentAmount: "",
        });
        setFamilyMembers([]);
        setMember({ name: "", mobile: "", aadhar: "" });
      } else {
        alert(`Failed: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error while submitting:", error);
      alert("An error occurred while submitting the application.");
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div
        className="w-full h-20 appHeading text-center bg-gray-200 py-4 shadow-md"

      >

        <h2 className="relative inline-block w-[40%] text-center mt-5 py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
          Application Form for {decodedSchemeName}
        </h2>

      </div>

      <form
        onSubmit={handleSubmit}
        className="application-form-border  px-8 pt-6 pb-8 mb-4 mt-5 w-full max-w-[95%] mobile-mt"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          {["firstName", "middleName", "lastName"].map((field, index) => (
            <div key={index} className="w-full md:w-1/2 px-3 mb-6">
              <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                className="appearance-none inputGreenBorder block w-full bg-gray-200 text-gray-700  py-3 px-4 leading-tight  uppercase"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                type="text"
                placeholder={field}
              />
            </div>
          ))}
        </div>

        {["incomeGroup", "plot", "category"].map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-left  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {field.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <select
              className="block w-full bg-gray-200 border  text-gray-700 py-3 px-4  focus:outline-none"
              name={field}
              value={formData[field]}
              onChange={handleChange}
            >
              {field === "incomeGroup" &&
                ["Under 500,000", "Under 1,000,000", "Above 1,000,000"].map(
                  (option) => <option key={option}>{option}</option>
                )}
              {field === "plot" &&
                ["Plot A", "Plot B", "Plot C"].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              {field === "category" &&
                ["General", "SC", "ST", "Other"].map((option) => (
                  <option key={option}>{option}</option>
                ))}
            </select>
          </div>
        ))}

        <div className="mb-6">
          <h3 className="text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Dependent Family Members
          </h3>
          <div className="mb-3">
            {["name", "mobile", "aadhar"].map((field) => (
              <input
                key={field}
                className="block w-full inputGreenBorder bg-gray-200  text-gray-700 py-2 px-3  mb-2 uppercase"
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={member[field]}
                onChange={(e) =>
                  setMember({
                    ...member,
                    [field]: e.target.value.toUpperCase(),
                  })
                }
              />
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddMember}
            >
              Add Family Member
            </button>
          </div>
          {familyMembers.length > 0 && (
            <ul className="text-left list-none block w-full bg-gray-200 border text-gray-700 py-2 px-3 rounded mb-2">
              {familyMembers.map((m, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 p-2 border-b"
                >
                  <div>
                    <strong>Name:</strong> {m.name} <br />
                    <strong>Mobile:</strong> {m.mobile} <br />
                    <strong>Aadhar:</strong> {m.aadhar}
                  </div>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDeleteMember(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 float-right text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit Application
        </button>
      </form>

    </div>
  );
}
