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
      <section
        className="hero bg-primary text-white text-center py-5 my-30"
        style={{
          marginTop: "160px",
        }}
      >
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

      <section className="events py-5" id="events">
        <div className="container">
          <h2 className="text-center mb-4">Upcoming Events</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="event mb-4">
                <h3>Community Meeting</h3>
                <p>Join us for a discussion on urban development plans.</p>
                <p>
                  <strong>Date:</strong> 15th November 2024
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="event mb-4">
                <h3>Clean City Initiative</h3>
                <p>Participate in our city-wide clean-up drive.</p>
                <p>
                  <strong>Date:</strong> 20th November 2024
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="event mb-4">
                <h3>Heritage Walk</h3>
                <p>Explore the historical landmarks of Ajmer.</p>
                <p>
                  <strong>Date:</strong> 25th November 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact py-5 bg-light" id="contact">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Message"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer
        className="bg-dark text-white text-center py-3"
        style={{
          width: "100%",
          borderRadius: "10px",
          height: "100px",
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
