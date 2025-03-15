import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "./SchemePage.css";

const SchemePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const schemes = [
    {
      title: "ADA Research Grant",
      description: "Financial assistance for researchers.",
      status: "Open",
      eligibility: "Researchers with a valid research proposal.",
      benefits: "Up to $50,000 in funding.",
    },
    {
      title: "ADA Entrepreneurship Support",
      description: "Funding and mentorship for startups.",
      status: "Application in Progress",
      eligibility: "Startups less than 3 years old.",
      benefits: "Mentorship and up to $100,000 in funding.",
    },
    {
      title: "ADA Education Scholarship",
      description: "Scholarships for students.",
      status: "Closed",
      eligibility: "Students with a minimum GPA of 3.5.",
      benefits: "Full tuition coverage.",
    },
    {
      title: "ADA Women Empowerment Program",
      description: "Skill development and funding for women.",
      status: "Open",
      eligibility: "Women entrepreneurs and professionals.",
      benefits: "Skill development workshops and funding.",
    },
    {
      title: "ADA Health Initiative",
      description: "Support for health-related projects.",
      status: "Open",
      eligibility: "Health professionals and organizations.",
      benefits: "Funding and resources for health projects.",
    },
    {
      title: "ADA Environmental Grant",
      description: "Funding for environmental conservation projects.",
      status: "Application in Progress",
      eligibility: "Environmental NGOs and activists.",
      benefits: "Up to $75,000 in funding.",
    },
    {
      title: "ADA Technology Innovation Fund",
      description: "Grants for tech innovation.",
      status: "Closed",
      eligibility: "Tech startups and innovators.",
      benefits: "Funding and access to tech resources.",
    },
    {
      title: "ADA Community Development Program",
      description: "Support for community development initiatives.",
      status: "Open",
      eligibility: "Community leaders and organizations.",
      benefits: "Funding and support for community projects.",
    },
    {
      title: "ADA Arts and Culture Grant",
      description: "Funding for arts and culture projects.",
      status: "Application in Progress",
      eligibility: "Artists and cultural organizations.",
      benefits: "Up to $30,000 in funding.",
    },
    {
      title: "ADA Sports Scholarship",
      description: "Scholarships for athletes.",
      status: "Closed",
      eligibility: "Athletes with a proven track record.",
      benefits: "Full scholarship and training support.",
    },
    {
      title: "ADA Rural Development Scheme",
      description: "Support for rural development projects.",
      status: "Open",
      eligibility: "Rural communities and organizations.",
      benefits: "Funding and resources for rural development.",
    },
    {
      title: "ADA Youth Empowerment Program",
      description: "Funding and mentorship for youth.",
      status: "Application in Progress",
      eligibility: "Youth aged 18-25.",
      benefits: "Mentorship and up to $20,000 in funding.",
    },
    {
      title: "ADA Senior Citizen Support",
      description: "Assistance for senior citizens.",
      status: "Closed",
      eligibility: "Senior citizens aged 60 and above.",
      benefits: "Financial assistance and healthcare support.",
    },
    {
      title: "ADA Disaster Relief Fund",
      description: "Support for disaster relief efforts.",
      status: "Open",
      eligibility: "Organizations involved in disaster relief.",
      benefits: "Funding and resources for disaster relief.",
    },
  ];

  const filteredSchemes = schemes.filter(
    (scheme) =>
      (filter === "All" || scheme.status === filter) &&
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyClick = (schemeTitle) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply for this scheme.");
      navigate("/login");
      return;
    }

    setSelectedScheme(schemeTitle);
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate(`/application-form/${encodeURIComponent(selectedScheme)}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const message = `
    <p><strong>Please read the following instructions carefully before proceeding:</strong></p>
    <ol>
      <li>Ensure you have scanned copies of all mandatory documents.</li>
      <li>Your profile must be fully updated.</li>
      <li>Double-check your eligibility criteria for this scheme.</li>
      <li>You need to provide address proof and ID proof.</li>
      <li>Upload recent passport-size photographs.</li>
      <li>Application once submitted cannot be edited.</li>
    </ol>
    <p>Click <strong>OK</strong> to proceed. If mandatory documents are missing, you will be redirected to your profile to upload them.</p>
  `;
  return (
    <>
      <div className={`container w-full mt-5 ${isModalOpen ? "blur" : ""}`}>
        <div className="greenBorder">
          <h2 className="relative inline-block w-[20%] text-center mt-6 py-2 mb-2 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
            ADA Schemes
          </h2>
          <br />
          <p className="text-center">
            Explore various schemes offered by ADA to support applicants in
            different domains.
          </p>
          <br />
          <div className="search-filter-bar flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
            <input
              type="text"
              placeholder="Search for schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input inputGreenBorder flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
            <select
              className="filter-select flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
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
              <div className="col-md-6 my-3" key={index}>
                <div className="card scheme-card h-100 my-3">
                  <div className="card-body d-flex flex-column my-3">
                    <h4 className="card-title">{scheme.title}</h4>
                    <p className="card-text flex-grow-1">
                      {scheme.description}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`badge bg-${
                          scheme.status === "Open"
                            ? "success"
                            : scheme.status === "Closed"
                            ? "danger"
                            : "warning"
                        }`}
                      >
                        {scheme.status}
                      </span>
                    </p>
                    <p>
                      <strong>Eligibility:</strong> {scheme.eligibility}
                    </p>
                    <p>
                      <strong>Benefits:</strong> {scheme.benefits}
                    </p>
                    <center>
                      {scheme.status === "Closed" ? (
                        ""
                      ) : (
                        <button
                          onClick={() => handleApplyClick(scheme.title)}
                          className="block custom-btn btn btn-light text-decoration-none schemes-apply-button mt-3"
                        >
                          Apply Now
                        </button>
                      )}
                    </center>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h3 className="mt-5 text-left">How to Apply</h3>

        <hr className="bg-blue-800 my-2" />
        <ol className="application-steps space-y-4">
          <li className="flex items-start gap-2">
            <span className="arrow-icon mt-1">➡️</span>
            <p className="text-left">
              Check eligibility criteria for the scheme.
            </p>
          </li>
          <hr />
          <li className="flex items-start gap-2">
            <span className="arrow-icon mt-1">➡️</span>
            <p className="text-left">Fill out the online application form.</p>
          </li>
          <hr />
          <li className="flex items-start gap-2">
            <span className="arrow-icon mt-1">➡️</span>
            <p className="text-left">Attach required documents.</p>
          </li>
          <hr />
          <li className="flex items-start gap-2">
            <span className="arrow-icon mt-1">➡️</span>
            <p className="text-left">
              Submit the application and await approval.
            </p>
          </li>
        </ol>
      </div>

      {isModalOpen && (
        <Modal
          message={message}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
    </>
  );
};

export default SchemePage;
