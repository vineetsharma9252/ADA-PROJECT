import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    disablity: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setProgress((prev) => Math.min(100, prev + 5)); // Example progress logic
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4500/user-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Profile Updated Successfully!");
        navigate(`/user-profile-2/api/data/${user.email}`);
      } else {
        alert(`Error: ${data.error}`); // Show backend error
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl p-8 shadow-lg bg-white rounded-lg relative overflow-y-auto max-h-screen">
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="fullName" placeholder="Full Name" value={user.fullName} onChange={handleChange} required />
          <input type="text" name="father_name" placeholder="Father's Name" value={user.father_name} onChange={handleChange} required />
          <input type="date" name="dob" placeholder="Date of Birth" value={user.dob} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleChange} required />

          {/* Select Options */}
          <select name="gender" value={user.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select name="marital_status" value={user.marital_status} onChange={handleChange} required>
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>

          <input type="text" name="caste" placeholder="Caste" value={user.caste} onChange={handleChange} />
          <input type="text" name="curr_address" placeholder="Current Address" value={user.curr_address} onChange={handleChange} required />
          <input type="text" name="perm_address" placeholder="Permanent Address" value={user.perm_address} onChange={handleChange} required />
          <input type="text" name="aadharCard" placeholder="Aadhar Card Number" value={user.aadharCard} onChange={handleChange} required />
          <input type="text" name="panCard" placeholder="PAN Card Number" value={user.panCard} onChange={handleChange} />
          <input type="text" name="voterId" placeholder="Voter ID" value={user.voterId} onChange={handleChange} />
          <input type="text" name="occupation" placeholder="Occupation" value={user.occupation} onChange={handleChange} />
          <input type="text" name="income" placeholder="Annual Income" value={user.income} onChange={handleChange} />
          <input type="text" name="education" placeholder="Education" value={user.education} onChange={handleChange} />
          <input type="text" name="disablity" placeholder="Disability (if any)" value={user.disablity} onChange={handleChange} />
          
          <button type="submit" disabled={loading} className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 rounded-lg">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileForm;
