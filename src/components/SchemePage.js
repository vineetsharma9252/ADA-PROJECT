import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./SchemePage.css";

const SchemePage = () => {
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

  return (

    <div className="container w-full mt-5">
      <div className="greenBorder" >
        <h2 className="relative inline-block w-[20%] text-center mt-6  py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
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
                    {(scheme.status === "Closed") ? " " :
                      <Link
                        to={`/application-form/${encodeURIComponent(scheme.title)}`}
                        className="custom-btn btn btn-light text-decoration-none schemes-apply-button mt-3"
                      >
                        Apply Now
                      </Link>
                    }
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
