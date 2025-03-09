import React, { useState } from "react";
import "./ApplicationForm.css";

export default function ApplicationForm() {
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

  const handleAddMember = () => {
    if (!member.name || !member.mobile || !member.aadhar) {
      alert("Please fill in all fields before adding a family member.");
      return;
    }
    setFamilyMembers([...familyMembers, member]);
    setMember({ name: "", mobile: "", aadhar: "" });
  };

  const handleDeleteMember = (index) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalData = { ...formData, familyMembers };
    try {
      const response = await fetch("http://localhost:4500/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });
      const responseData = await response.json();
      if (response.ok) {
        alert("Application submitted successfully!");
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
      <div className="w-full text-center bg-gray-200 py-4 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800">
          Application Form for [Scheme Name]
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-2 w-full max-w-2xl"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          {["firstName", "middleName", "lastName"].map((field, index) => (
            <div key={index} className="w-full md:w-1/2 px-3 mb-6">
              <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
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
            <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {field.replace(/([A-Z])/g, " $1").trim()}
            </label>
            <select
              className="block w-full bg-gray-200 border text-gray-700 py-3 px-4 rounded focus:outline-none"
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
                className="block w-full bg-gray-200 border text-gray-700 py-2 px-3 rounded mb-2"
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={member[field]}
                onChange={(e) =>
                  setMember({ ...member, [field]: e.target.value })
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
