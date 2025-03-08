import React, { useState } from 'react';
import './ApplicationForm.css';


export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    incomeGroup: 'Under 500,000', // Default value
    plot: 'Plot A', // Example for other fields
    category: 'General',
    paymentAmount: '',

  });

  const [familyMembers, setFamilyMembers] = useState([]);
  const [member, setMember] = useState({ name: '', mobile: '', aadhar: '' });

  const handleAddMember = () => {
    if (!member.name || !member.mobile || !member.aadhar) {
      alert("Please fill in all fields before adding a family member.");
      return;
    }
    setFamilyMembers([...familyMembers, member]);
    setMember({ name: '', mobile: '', aadhar: '' });
  };

  // Function to delete a member by index
  const handleDeleteMember = (index) => {
    const updatedMembers = familyMembers.filter((_, i) => i !== index);
    setFamilyMembers(updatedMembers);
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4500/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        alert('Application submitted successfully!');
        console.log(data); // Optional: Log the response
      } else {
        const errorData = await response.json();
        alert(`Failed to submit application: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the application.');
      console.error(error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">

      <form  className="w-full  max-w-2xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  ">
        {/* Existing Fields */}
        <div className="flex flex-wrap  -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
              id="grid-first-name"
              value={formData.firstName}
              name='firstName'
              onChange={handleChange}
              type="text"
              placeholder="Jane"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none"
              id="grid-last-name"
              value={formData.lastName}
              name='lastName'
              onChange={handleChange}
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Income Group */}
        <div className="mb-4">
          <label
            className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="income-group"
          >
            Income Group
          </label>
          <select
            className="block w-full bg-gray-200 border text-gray-700 py-3 px-4 rounded focus:outline-none"
            id="income-group"
            value={formData.incomeGroup} // Bind to formData
            name="incomeGroup" // Set the name for easier handling
            onChange={handleChange} // Handle change
          >
            <option value="Under 500,000">Under 500,000</option>
            <option value="Under 1,000,000">Under 1,000,000</option>
            <option value="Above 1,000,000">Above 1,000,000</option>
          </select>
        </div>

        {/* Plot */}
        <div className="mb-4">
          <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="plot">
            Plot
          </label>
          <select className="block w-full bg-gray-200 border text-gray-700 py-3 px-4 rounded focus:outline-none" id="plot">
            <option>Plot A</option>
            <option>Plot B</option>
            <option>Plot C</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select className="block w-full bg-gray-200 border text-gray-700 py-3 px-4 rounded focus:outline-none" id="category">
            <option>General</option>
            <option>SC</option>
            <option>ST</option>
            <option>Other</option>
          </select>
        </div>

        {/* Family Member Section  */}
        <div className="mb-6">
          <h3 className="text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Dependent Family Members</h3>
          <div className="mb-3">
            <input
              className="block w-full bg-gray-200 border text-gray-700 py-2 px-3 rounded mb-2"
              type="text"
              placeholder="Member Name"
              value={member.name}
              onChange={(e) => setMember({ ...member, name: e.target.value })}
            />
            <input
              className="block w-full bg-gray-200 border text-gray-700 py-2 px-3 rounded mb-2"
              type="text"
              placeholder="Mobile Number"
              value={member.mobile}
              onChange={(e) => setMember({ ...member, mobile: e.target.value })}
            />
            <input
              className="block w-full bg-gray-200 border text-gray-700 py-2 px-3 rounded mb-3"
              type="text"
              placeholder="Aadhar Number"
              value={member.aadhar}
              onChange={(e) => setMember({ ...member, aadhar: e.target.value })}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddMember}
            >
              Add Family Member
            </button>
          </div>
          {familyMembers.length > 0 && (
            <ul className="text-left list-none block w-full bg-gray-200 border text-gray-700 py-2 px-3 rounded mb-2 text-gray-700">
              {familyMembers.map((m, index) => (
                <li key={index} className="flex justify-between items-center mb-2 p-2 border-b">
                  <div>
                    <strong>Name:</strong> {m.name} <br />
                    <strong>Mobile:</strong> {m.mobile} <br />
                    <strong>Aadhar:</strong> {m.aadhar}
                  </div>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => handleDeleteMember(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payment Amount */}

        <div>
          <label className="block text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            Enter your amount
          </label>

          <div className="flex justify-between items-center mb-2  ">
            <input
              className="block w-80 bg-gray-200 border text-gray-700 py-2 px-3 rounded mb-1"
              type="number"
              placeholder="Enter amount... "
              value={formData.paymentAmount}
              onChange={handleChange}
              name="paymentAmount"
            />
            <button className="ml-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-1 ">
              Pay Now
            </button>
          </div>

        </div>



        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2 "
          onClick={handleSubmit}
        >
          Submit your applicaion
        </button>

      </form>
    </div>
  );
}
