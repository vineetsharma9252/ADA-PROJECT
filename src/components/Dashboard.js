import React, { memo, useEffect, useState } from "react";
import "./DashboardCSS.css";

const Dashboard = memo(function Dashboard() {
  // State for applications and counts
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });


  useEffect(() => {
    fetch('http://localhost:4500/dashboard/counts')
      .then(res => res.json())
      .then(data => { 
        setCounts(data); // Set to your state
      })
      .catch(err => console.error(err));
  }, []);
  

  return (
    <div className="container mt-5">
      <h2 className="text-center text-xl bg-gray-200 p-10 my-20">
        ADA Dashboard
      </h2>

      {/* Cards Section */}
      <div className="row mt-4">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
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
          <div className="small-box bg-warning">
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
          <div className="small-box bg-success">
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
          <div className="small-box bg-danger">
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
      <h3 className="mt-5">ADA Applications Overview</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Department Comments</th> {/* Optional Column */}
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr key={app._id || index}> {/* ✅ Prefer unique backend ID */}
                  <td>{index + 1}</td>
                  <td>{app.name}</td>
                  <td>{app.startDate ? app.startDate.slice(0, 10) : "N/A"}</td> {/* Show only YYYY-MM-DD */}
                  <td>{app.endDate ? app.endDate.slice(0, 10) : "N/A"}</td>
                  <td>{app.status}</td>
                  <td>{app.comments ? app.comments : "N/A"}</td> {/* Handle empty comments */}
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
