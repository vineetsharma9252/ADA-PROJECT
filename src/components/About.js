import React, { memo } from "react";
import PropTypes from "prop-types";
import "./AboutCSS.css";
const About = memo(function About(props) {
  const { setIsAbout } = props;
  return (
    <div>
      <div class="container_about my-20">
        <h2>About Ajmer Development Authority</h2>
        <p>
          The <strong>Ajmer Development Authority (ADA)</strong> was established
          in 1960 under the Rajasthan Urban Improvement Act of 1959 to drive the
          planned and sustainable growth of Ajmer city. As a key governing body,
          ADA is responsible for urban development, infrastructure enhancement,
          and ensuring a well-structured expansion of the city.
        </p>

        <h3>Our Responsibilities:</h3>
        <ul>
          <li>
            <strong>Urban Development & Planning</strong> – Implementation of
            structured growth policies for the city.
          </li>
          <li>
            <strong>Infrastructure Development</strong> – Roads, drainage
            systems, and civic amenities.
          </li>
          <li>
            <strong>Public Welfare Projects</strong> – Housing, sanitation, and
            environmental initiatives.
          </li>
          <li>
            <strong>Heritage & Tourism Preservation</strong> – Enhancing the
            beauty of historic landmarks like Pushkar Lake, Prithviraj Smarak,
            Dargah Sharif, and Anasagar Lake.
          </li>
        </ul>

        <h3>Tenders & Projects</h3>
        <p>
          ADA actively engages in various developmental projects through
          tenders, including road constructions, drainage systems, and public
          infrastructure improvements. Recent projects include CC road work,
          urban beautification, and labor supply for key construction sites.
        </p>

        <p>
          For the latest updates on projects, tenders, and urban development
          plans, visit our official website.
        </p>
        <p>
          <strong>
            👉{" "}
            <a
              href="https://urban.rajasthan.gov.in/content/raj/udh/ada-ajmer/en/home.html"
              target="_blank"
            >
              Visit ADA Website
            </a>
          </strong>
        </p>
      </div>
    </div>
  );
});

About.propTypes = {};

export default About;
