import React, { memo, useEffect, useState } from "react";
import "./DashboardCSS.css";
import { ClipLoader } from "react-spinners";

const Dashboard = memo(function Dashboard() {
  // State for applications and counts
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // Fetch data on component mount
  useEffect(() => {
    // Fetch application counts
    fetch("http://localhost:4500/dashboard/counts")
      .then((res) => res.json())
      .then((data) => {
        setCounts(data); // Set to your state
      })
      .catch((err) => console.error(err));

    // Fetch applications
    fetch("http://localhost:4500/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data); // Set applications state
        setLoading(false); // Set loading to false after data is fetched
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  // Show loading spinner if data is still being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4caf50" size={50} /> {/* Spinner */}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center ada-dashboard text-3xl text-white p-10 mt-4">
        ADA Dashboard
      </h2>

      {/* Cards Section */}
      <div className="row mt-4">
        <div className="col-lg-3 col-6">
          <div className="adaInfoCard small-box bg-info">
            <div className="inner">
              <h3>{counts.total}</h3>
              <p>Total ADA Applications</p>
            </div>
            <div className="icon">
              <i className="fas fa-file-alt"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="adaInfoCard small-box bg-warning">
            <div className="inner">
              <h3>{counts.pending}</h3>
              <p>Pending ADA Applications</p>
            </div>
            <div className="icon">
              <i className="fas fa-clock"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="adaInfoCard small-box bg-success">
            <div className="inner">
              <h3>{counts.approved}</h3>
              <p>Approved ADA Applications</p>
            </div>
            <div className="icon">
              <i className="fas fa-check-circle"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="adaInfoCard small-box bg-danger">
            <div className="inner">
              <h3>{counts.rejected}</h3>
              <p>Rejected ADA Applications</p>
            </div>
            <div className="icon">
              <i className="fas fa-times-circle"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <h3 className="mt-5 text-2xl text-left mb-1">
        ADA Applications Overview
      </h3>
      <hr />
      <br />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Application ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Department Comments</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app._id || index}>
                  <td>{index + 1}</td>
                  <td>{app.applicationID}</td>
                  <td>{app.startDate ? app.startDate.slice(0, 10) : "N/A"}</td>
                  <td>{app.endDate ? app.endDate.slice(0, 10) : "N/A"}</td>
                  <td>{app.status}</td>
                  <td>{app.comments ? app.comments : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Dashboard;
