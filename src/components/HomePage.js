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
        className="hero bg-primary text-white text-center py-5"
        style={{
          height: "400px",
        }}
      >
        <div
          className="container"
          style={{
            marginTop: "150px",
          }}
        >
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

      {/* Highlights Section */}
      <section className="highlights py-5">
        <div className="container">
          <div className="row">
            {[
              {
                title: "Ongoing Projects",
                text: "Infrastructure development, road construction, and urban beautification.",
              },
              {
                title: "Tenders & Notices",
                text: "Check the latest government tenders and contracts.",
              },
              {
                title: "Urban Development",
                text: "Plans for smart city initiatives and sustainable growth.",
              },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-text">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="services py-5 bg-light" id="services">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            {[
              { icon: "🏡", text: "Town Planning" },
              { icon: "🚧", text: "Infrastructure Development" },
              { icon: "🏗️", text: "Tenders & Contracts" },
              { icon: "📜", text: "Legal & Property Info" },
            ].map((service, index) => (
              <div className="col-md-3" key={index}>
                <div className="card shadow-sm text-center py-4">
                  <div className="card-body">
                    <h3>{service.icon}</h3>
                    <p>{service.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="events py-5" id="events">
        <div className="container">
          <h2 className="text-center mb-4">Upcoming Events</h2>
          <div className="row">
            {[
              {
                title: "Community Meeting",
                description:
                  "Join us for a discussion on urban development plans.",
                date: "15th November 2024",
              },
              {
                title: "Clean City Initiative",
                description: "Participate in our city-wide clean-up drive.",
                date: "20th November 2024",
              },
              {
                title: "Heritage Walk",
                description: "Explore the historical landmarks of Ajmer.",
                date: "25th November 2024",
              },
            ].map((event, index) => (
              <div className="col-md-4" key={index}>
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h3 className="card-title">{event.title}</h3>
                    <p className="card-text">{event.description}</p>
                    <p>
                      <strong>Date:</strong> {event.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact py-5 bg-light" id="contact">
        <div className="container">
          <h2 className="text-center mb-4">Contact Us</h2>
          <div className="card shadow-sm p-4">
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
        </div>
      </section>

      {/* Footer Section */}
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
