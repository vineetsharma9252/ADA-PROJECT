import React, { memo, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 Import useNavigate
import "./DashboardCSS.css";
import { ClipLoader } from "react-spinners";

const Dashboard = memo(function Dashboard() {
  const navigate = useNavigate(); // 👈 Initialize useNavigate
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const location = useLocation();
  const email = location.state?.email;

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const countsResponse = await fetch(
          `http://localhost:4500/dashboard/${email}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const countsData = await countsResponse.json();
        setCounts(countsData);

        const applicationsResponse = await fetch(
          `http://localhost:4500/dashboard/applicationData/${email}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const applicationsData = await applicationsResponse.json();
        setApplications(applicationsData);
        console.log(applicationsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      // Ensure email is available before fetching
      fetchData();
    }
  }, [email]);

  // Show loading spinner if data is still being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4caf50" size={50} /> {/* Spinner */}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 px-4">
      {/* Back Button - Aligned to the Left */}
      <div className="flex justify-start">
        {" "}
        {/* 👈 Align button to the left */}
        <button
          onClick={() => navigate("/schemes")} // 👈 Navigate to Schemes Page
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          Back to Schemes
        </button>
      </div>

      <h2 className="text-center ada-dashboard text-4xl text-white p-10 mt-4">
        ADA Dashboard
      </h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="adaInfoCard bg-info p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inner">
            <h3 className="text-3xl font-bold">{counts.total}</h3>
            <p className="text-lg">Total ADA Applications</p>
          </div>
          <div className="icon">
            <i className="fas fa-file-alt text-5xl"></i>
          </div>
        </div>
        <div className="adaInfoCard bg-warning p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inner">
            <h3 className="text-3xl font-bold">{counts.pending}</h3>
            <p className="text-lg">Pending ADA Applications</p>
          </div>
          <div className="icon">
            <i className="fas fa-clock text-5xl"></i>
          </div>
        </div>
        <div className="adaInfoCard bg-success p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inner">
            <h3 className="text-3xl font-bold">{counts.approved}</h3>
            <p className="text-lg">Approved ADA Applications</p>
          </div>
          <div className="icon">
            <i className="fas fa-check-circle text-5xl"></i>
          </div>
        </div>
        <div className="adaInfoCard bg-danger p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="inner">
            <h3 className="text-3xl font-bold">{counts.rejected}</h3>
            <p className="text-lg">Rejected ADA Applications</p>
          </div>
          <div className="icon">
            <i className="fas fa-times-circle text-5xl"></i>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <h3 className="mt-8 text-3xl text-left mb-4">
        ADA Applications Overview
      </h3>
      <hr />
      <br />
      <div className="table-responsive">

      <table className="w-full border-collapse border border-gray-300">
  <thead className="bg-green-700 text-white">
    <tr>
      <th className="p-3">#</th>
      <th className="p-3">Application ID</th>
      <th className="p-3">Start Date</th>
      <th className="p-3">End Date</th>
      <th className="p-3">Status</th>
      <th className="p-3">Department Comments</th>
    </tr>
  </thead>
  <tbody>
    {applications.length > 0 ? (
      applications.map((app, index) => (
        <tr key={app._id || index}>
          <td className="border p-2">{index + 1}</td>
          <td className="border p-2">{app.name}</td>
          <td className="border p-2">{app.startDate ? app.startDate.slice(0, 10) : "N/A"}</td>
          <td className="border p-2">{app.endDate ? app.endDate.slice(0, 10) : "N/A"}</td>
          <td className="border p-2">{app.status}</td>
          <td className="border p-2">{app.comments ? app.comments : "N/A"}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6" className="text-center p-3">No applications found.</td>
      </tr>
    )}
  </tbody>
</table>


      </div>
    </div>
  );
});

export default Dashboard;
