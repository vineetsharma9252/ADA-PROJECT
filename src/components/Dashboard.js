import React, { memo } from "react";
import PropTypes from "prop-types";
import "./DashboardCSS.css";

const Dashboard = memo(function Dashboard(props) {
  return (
    <div>
      <div class="container mt-5">
        <h2 class="text-center text-xl bg-gray-200 p-10 my-20">
          ADA Dashboard
        </h2>
        <div class="row mt-4">
          <div class="col-lg-3 col-6">
            <div class="small-box bg-info">
              <div class="inner">
                <h3>0</h3>
                <p>ADA Requests</p>
              </div>
              <div class="icon">
                <i class="fas fa-user-plus"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box bg-success">
              <div class="inner">
                <h3>0</h3>
                <p>Total ADA Applications</p>
              </div>
              <div class="icon">
                <i class="fas fa-file-alt"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box bg-warning">
              <div class="inner">
                <h3>0</h3>
                <p>Pending ADA Applications</p>
              </div>
              <div class="icon">
                <i class="fas fa-clock"></i>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-6">
            <div class="small-box bg-danger">
              <div class="inner">
                <h3>0</h3>
                <p>Rejected ADA Applications</p>
              </div>
              <div class="icon">
                <i class="fas fa-times-circle"></i>
              </div>
            </div>
          </div>
        </div>

        <h3 class="mt-5">ADA Applications Overview</h3>
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Applicant Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>01-03-2025</td>
              <td>30-06-2025</td>
              <td>Pending</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>15-02-2025</td>
              <td>15-05-2025</td>
              <td>Approved</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Michael Johnson</td>
              <td>10-01-2025</td>
              <td>10-04-2025</td>
              <td>Rejected</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Emily Davis</td>
              <td>20-04-2025</td>
              <td>20-07-2025</td>
              <td>Approved</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
});

Dashboard.propTypes = {};

export default Dashboard;
