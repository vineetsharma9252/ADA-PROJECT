import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./SchemePage.css";

const SchemePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const schemes = [
    {
      title: "ADA Research Grant",
      description: "Financial assistance for researchers.",
      status: "Open",
    },
    {
      title: "ADA Entrepreneurship Support",
      description: "Funding and mentorship for startups.",
      status: "Application in Progress",
    },
    {
      title: "ADA Education Scholarship",
      description: "Scholarships for students.",
      status: "Closed",
    },
    {
      title: "ADA Women Empowerment Program",
      description: "Skill development and funding for women.",
      status: "Open",
    },
  ];

  const filteredSchemes = schemes.filter(
    (scheme) =>
      (filter === "All" || scheme.status === filter) &&
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

//Handle apply logic

// Mock check for required documents
const checkRequiredDocuments = (schemeTitle) => {
  // For demo purposes, let's say documents are missing for "ADA Research Grant"
  const missingDocsSchemes = ["ADA Research Grant", "ADA Women Empowerment Program"];
  return missingDocsSchemes.includes(schemeTitle); // returns true if all docs present
};

// Function to handle Apply Now click
const handleApplyClick = (schemeTitle) => {

  const token = localStorage.getItem("token"); // Check token

  if (!token) {
    alert("Please login to apply for this scheme.");
    navigate("/login");
    return; // Stop further execution
  }

  const message = `
Please read the following instructions carefully before proceeding:

1. Ensure you have scanned copies of all mandatory documents.
2. Your profile must be fully updated.
3. Double-check your eligibility criteria for this scheme.
4. You need to provide address proof and ID proof.
5. Upload recent passport-size photographs.
6. Application once submitted cannot be edited.

Click OK to proceed. If mandatory documents are missing, you will be redirected to your profile to upload them.
  `;

  if (window.confirm(message)) {
    if (checkRequiredDocuments(schemeTitle)) {
      // All documents present, proceed to application form
      navigate(`/application-form/${encodeURIComponent(schemeTitle)}`);
    } else {
      // Documents missing, redirect to profile page
      alert("Some required documents are missing. Please complete your profile first.");
      navigate('/profile');
    }
  }
};

  return (

    <div className="container w-full mt-5">
      <div className="greenBorder" >
        <h2 className="relative inline-block w-[20%] text-center mt-6  py-2 mb-2 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
          ADA Schemes
        </h2>
        <br />
        <p className="text-center">
          Explore various schemes offered by ADA to support applicants in
          different domains.
        </p>
        <br />
        <div className="search-filter-bar">
          <input
            type="text"
            placeholder="Search for schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input inputGreenBorder "
          />
          <select
            className="filter-select"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="Application in Progress">
              Application in Progress
            </option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="row mt-4">
          {filteredSchemes.map((scheme, index) => (
            <div className="col-md-6" key={index}>
              <div className="card scheme-card">
                <div className="card-body">
                  <h4 className="card-title">{scheme.title}</h4>
                  <p className="card-text">{scheme.description}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge bg-${scheme.status === "Open"
                        ? "success"
                        : scheme.status === "Closed"
                          ? "danger"
                          : "warning"
                        }`}
                    >
                      {scheme.status}
                    </span>

                    {/* // In map loop */}
                   <center>
                   {(scheme.status === "Closed") ? " " :
                      <button
                        onClick={() => handleApplyClick(scheme.title)}
                        className="block custom-btn btn btn-light text-decoration-none schemes-apply-button mt-3"
                      >
                        Apply Now
                      </button>
                    }
                   </center>

                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <h3 className="mt-5 text-left ">How to Apply</h3>

      <hr className="bg-blue-800 my-2" />
      <ol className="application-steps">
        <li>
          <span className="arrow-icon">➡️</span> Check eligibility criteria for
          the scheme.
        </li>
        <li>
          <span className="arrow-icon">➡️</span> Fill out the online application
          form.
        </li>
        <li>
          <span className="arrow-icon">➡️</span> Attach required documents.
        </li>
        <li>
          <span className="arrow-icon">➡️</span> Submit the application and
          await approval.
        </li>
      </ol>

    </div>
  );
};

export default SchemePage;
