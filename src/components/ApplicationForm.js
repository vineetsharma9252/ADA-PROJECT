import React, { useState, useEffect } from "react";
import DOMPurify from "dompurify"; // Prevents XSS attacks
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
    plot: "", // Ensure plot is initialized
    category: "",
    paymentAmount: "",
  });

  const email = localStorage.getItem("email");

  // Fetch user data from User Collection for prefill
  useEffect(() => {
    fetch(`http://localhost:4500/user-profile/api/data/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          incomeGroup: data.income || "",
          category: (data.caste || "").toLowerCase(),
        }));
      })
      .catch((err) => console.error(err));
  }, [email]);

  const [familyMembers, setFamilyMembers] = useState([]);
  const [member, setMember] = useState({ name: "", mobile: "", aadhar: "" });

  // Utility functions for validation
  const isValidName = (name) => /^[A-Z\s]+$/.test(name);
  const isValidMobile = (mobile) => /^[6-9]\d{9}$/.test(mobile);
  const isValidAadhar = (aadhar) => /^\d{12}$/.test(aadhar);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only convert to uppercase for name fields
    const upperValue = ["firstName", "middleName", "lastName"].includes(name)
      ? value.toUpperCase()
      : value;
    const sanitizedValue = DOMPurify.sanitize(upperValue);

    if (["firstName", "middleName", "lastName"].includes(name)) {
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
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:4500/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalData),
      });

      const responseData = await response.json();

      if (response.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized!",
          text: "Please login to continue.",
          confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/login");
        });
        return;
      }

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Application submitted successfully!",
        });
        navigate("/dashboard");

        // Reset Form
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          incomeGroup: "Under 500,000",
          plot: "",
          category: "",
          paymentAmount: "",
        });
        setFamilyMembers([]);
        setMember({ name: "", mobile: "", aadhar: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: responseData.message || "Unknown error",
        });
      }
    } catch (error) {
      console.error("Error while submitting:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred while submitting the application.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full h-20 appHeading text-center bg-gray-200 py-4 shadow-md">
        <h2 className="relative inline-block w-[40%] text-center mt-5 py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
          Application Form for {decodedSchemeName}
        </h2>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/schemes")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 self-start ml-4 hover:bg-green-600"
      >
        Back to Schemes
      </button>

      <form
        onSubmit={handleSubmit}
        className="application-form-border px-8 pt-6 pb-8 mb-4 mt-5 w-full max-w-[95%] mobile-mt"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          {["firstName", "middleName", "lastName"].map((field, index) => (
            <div key={index} className="w-full md:w-1/2 px-3 mb-6">
              <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                {field.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                className="appearance-none inputGreenBorder block w-full bg-gray-200 text-gray-700 py-3 px-4 leading-tight uppercase"
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
              className="block w-full bg-gray-200 border text-gray-700 py-3 px-4 focus:outline-none"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              required
            >
              <option value="">
                Select {field.replace(/([A-Z])/g, " $1").trim()}
              </option>

              {field === "incomeGroup" &&
                [
                  { value: "Under 100,000", label: "Below 1 Lakh" },
                  { value: "100,000 - 200,000", label: "1L - 2L" },
                  { value: "200,000 - 500,000", label: "2L - 5L" },
                  { value: "500,000 - 1,000,000", label: "5L - 10L" },
                  { value: "Above 1,000,000", label: "10L+" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

              {field === "plot" &&
                ["Plot A", "Plot B", "Plot C"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}

              {field === "category" &&
                [
                  { value: "general", label: "GENERAL" },
                  { value: "obc", label: "OBC" },
                  { value: "sc", label: "SC" },
                  { value: "st", label: "ST" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
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
                className="block w-full inputGreenBorder bg-gray-200 text-gray-700 py-2 px-3 mb-2 uppercase"
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
