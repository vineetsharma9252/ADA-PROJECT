import React, { memo } from "react";
import PropTypes from "prop-types";
import "./HomePageCSS.css";
const HomePage = memo(function HomePage(props) {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
      }}
    >
      <section className="hero bg-primary text-white text-center py-5 my-60">
        <div className="container">
          <h1>Shaping Ajmer’s Future with Sustainable Development</h1>
          <p>
            Ensuring planned urban growth, infrastructure enhancement, and
            heritage preservation.
          </p>
          <a href="#projects" className="btn btn-light mt-3">
            View Projects
          </a>
        </div>
      </section>

      <section className="highlights py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="card-title">Ongoing Projects</h3>
                  <p className="card-text">
                    Infrastructure development, road construction, and urban
                    beautification.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="card-title">Tenders & Notices</h3>
                  <p className="card-text">
                    Check the latest government tenders and contracts.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h3 className="card-title">Urban Development</h3>
                  <p className="card-text">
                    Plans for smart city initiatives and sustainable growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services py-5 bg-light" id="services">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-3">
              <div className="service text-center">🏡 Town Planning</div>
            </div>
            <div className="col-md-3">
              <div className="service text-center">
                🚧 Infrastructure Development
              </div>
            </div>
            <div className="col-md-3">
              <div className="service text-center">🏗️ Tenders & Contracts</div>
            </div>
            <div className="col-md-3">
              <div className="service text-center">
                📜 Legal & Property Info
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="bg-dark text-white text-center py-3"
        style={{
          width: "100%",
          borderRadius: "40px",
        }}
      >
        <div className="container">
          <p>&copy; 2024 Ajmer Development Authority | All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
});

HomePage.propTypes = {};

export default HomePage;
