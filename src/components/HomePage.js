import React, { memo } from "react";
import PropTypes from "prop-types";
import "./HomePageCSS.css";
import Footer from "./Footer";

const HomePage = memo(function HomePage(props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        {/* Hero Section */}
        <section className="hero bg-primary text-white text-center d-flex align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
          <div className="container mt-20 ">
            <h1 className="display-4 display-md-3 mt-20 display-lg-2">Shaping Ajmer’s Future with Sustainable Development</h1>
            <p className="lead lead-md lead-lg">Ensuring planned urban growth, infrastructure enhancement, and heritage preservation.</p>
            <a href="#projects" className="btn btn-light mt-3">View Projects</a>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="highlights py-5 mt-5">
          <div className="container">
            <h2 className="text-center  mb-5">Key Highlights</h2>
            <div className="row">
              {[
                { title: "Ongoing Projects", text: "Infrastructure development, road construction, and urban beautification." },
                { title: "Tenders & Notices", text: "Check the latest government tenders and contracts." },
                { title: "Urban Development", text: "Plans for smart city initiatives and sustainable growth." },
              ].map((item, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                      <h3 className="card-title h5">{item.title}</h3>
                      <p className="card-text">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about py-5 mt-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5">About Ajmer Development</h2>
            <div className="row">
              
              <div className=" d-flex align-items-center">
                <div className="w-full" >
                  <p className="w-full text-left ">
                    Ajmer is a city of historical and cultural significance, and we are committed to its sustainable development. Our initiatives focus on preserving heritage while promoting modern infrastructure and smart city solutions.
                  </p>
                  <a href="#about" className="btn btn-primary mt-3">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects py-5 mt-5">
          <div className="container">
            <h2 className="text-center mb-5">Our Projects</h2>
            <div className="row">
              {[
                { title: "Road Expansion", text: "Widening and improving major roads for better connectivity." },
                { title: "Heritage Restoration", text: "Restoring historical sites to preserve Ajmer's rich culture." },
                { title: "Green Spaces", text: "Developing parks and green belts for a healthier environment." },
              ].map((item, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                      <h3 className="card-title h5">{item.title}</h3>
                      <p className="card-text">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact py-5 mt-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5">Contact Us</h2>
            <div className="row">
              <div className="col-md-6 mx-auto">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label"  >Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-left ">Email</label>
                    <input type="email" className="form-control text-left " id="email" placeholder="Enter your email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label text-left ">Message</label>
                    <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Fixed at Bottom */}
      <Footer className="mt-auto" />
    </div>
  );
});

HomePage.propTypes = {};

export default HomePage;