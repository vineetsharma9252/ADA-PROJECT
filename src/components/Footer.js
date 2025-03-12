import React, { useState, useEffect } from "react";
import './Footer.css';

const Footer = () => {
  // State to hold current date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect to update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // update state with new date-time
    }, 1000); // runs every 1 second (1000 ms)

    // Cleanup function to stop timer when component unmounts
    return () => clearInterval(timer);
  }, []); // empty dependency array means this runs only once when component mounts

  // Formatting Date
  const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const formattedDate = currentTime.toLocaleDateString('en-GB', dateOptions); // Example: 12/Mar/2025

  // Formatting Time
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
  const formattedTime = currentTime.toLocaleTimeString('en-US', timeOptions); // Example: 08:34:25 AM

  return (
    <footer id="footerArea" className="d-print-none">
      <div className="container">
        <div className="row justify-content-between py-4">

          {/* Information Section */}
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 text-left mb-4">
            <h4 className="footer-heading">Information</h4>
            <div className="footer-visitor-info">
              <p>Website Visitors: <strong>2</strong></p>
              <p className="whitespace-nowrap">Last Updated On: <strong>{formattedDate}, {formattedTime}</strong></p>
            </div>
            <ul className="social d-flex gap-3 p-0 m-0">
              <li><a href="https://www.facebook.com/RajCMO/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f footer-icons "></i></a></li>
              <li><a href="https://twitter.com/RajCMO" className="footer-icons" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512">
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                </svg>
              </a></li>
              <li><a href="https://www.facebook.com/RajCMO/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-whatsapp footer-icons " ></i></a></li>
            </ul>
          </div>

          {/* External Links */}
          <div className="col-xl-6 col-lg-6 col-md-4 col-sm-12 text-center mb-4">
            <h4 className="footer-heading">External Links</h4>
           
            <ul className="quick-link list-unstyled">
              <li><a href="https://sampark.rajasthan.gov.in/"   target="_blank" rel="noopener noreferrer">Rajasthan Sampark/ CM Helpline</a></li>
              <li><a href="https://jda.rajasthan.gov.in/home/dptHome" target="_blank" rel="noopener noreferrer">Jaipur Development Authority (JDA)</a></li>
              <li><a href="https://urban.rajasthan.gov.in/content/raj/udh/ctp/en/home.html" target="_blank" rel="noopener noreferrer">Town Planning Department</a></li>
              <li><a href="https://rera.rajasthan.gov.in/" target="_blank" rel="noopener noreferrer">RERA</a></li>
              <li><a href="https://eproc.rajasthan.gov.in/nicgep/app" target="_blank" rel="noopener noreferrer">E-Procurement Portal</a></li>
              <li><a href="https://www.jaipurmetrorail.info/" target="_blank" rel="noopener noreferrer">Jaipur Metro Rail Corporation</a></li>
              <li><a href="/pages/department-page/1028">Links of Important Portals</a></li>
            </ul>

          </div>

          {/* Contact Section */}
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 text-left mb-4">
            <h4 className="footer-heading">Contact</h4>
            <p><strong>Sangeeta Ramchandani</strong></p>
            <p>Deputy Director (ACP)</p>
            <p><a href="mailto:adaajmer@gmail.com" className="footer-email">adaajmer@gmail.com</a></p>
          </div>

          {/* Bottom Links */}
          <div className="col-md-12 text-center pt-3 border-top">
            <div className="footer-ext-links d-flex justify-content-center flex-wrap gap-3">
              <a href="/jankalyan-category-and-entry-type/0/51/88">Terms & Condition</a>
              <a href="/pages/sitemap">Sitemap</a>
              <a href="/jankalyan-category-and-entry-type/0/50/92">Screen Reader Access</a>
              <a href="/jankalyan-category-and-entry-type/0/50/89">Accessibility Statement</a>
              <a href="/pages/website-policies">Website Policy</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
