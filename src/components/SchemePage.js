import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import "./SchemePage.css";
import { schemes } from "./content";

const SchemePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [token, setToken] = useState(null);
  const filteredSchemes = schemes.filter(
    (scheme) =>
      (filter === "All" || scheme.status === filter) &&
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Fetch token from cookies
  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:4500/auth/token", {
        credentials: "include",
      });
      const data = await response.json();
      setToken(data.token);
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  const handleApplyClick = (schemeTitle) => {
    const token = fetchToken();

    if (!token) {
      alert("You need to log in to apply for this scheme.");
      navigate("/login"); // 🔹 Redirect user to login
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
    <ol className="text-left">
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
        <div className="w-full ">
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
                    <p className="text-left">
                      <strong>Eligibility:</strong> {scheme.eligibility}
                    </p>
                    <p className="text-left">
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
