import React, { memo, useState, useEffect } from "react";
import { Building2, Landmark, TreePine, Home, User, List } from "lucide-react"; // Added icons
import PropTypes from "prop-types";
import "./HomePageCSS.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import BackgroundForADA from "../assets/background_for_ada.jpg";

const HomePage = memo(function HomePage(props) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailResponse = await fetch("http://localhost:4500/user-data", {
          method: "GET",
          credentials: "include", // ✅ This sends cookies with the request
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!emailResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const emailData = await emailResponse.json();
        console.log(emailData);
        setEmail(emailData.email);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Function to handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle navigation
  const handleNavigation = (route, state) => {
    navigate(route, { state });
    setIsMenuOpen(false); // Close the menu after navigation
  };

  console.log(email); // Moved inside the functional component

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Floating Menu Button */}
      <div className="fixed bottom-8 right-8" style={{ zIndex: 1000 }}>
        {/* Menu Items */}
        {isMenuOpen && (
          <div className="flex flex-col items-end mb-2 space-y-2">
            {/* Schemes */}
            <button
              onClick={() => handleNavigation("/schemes")}
              className="bg-[oklch(0.627_0.194_149.214)] text-white p-3 rounded-full shadow-lg hover:bg-[oklch(0.627_0.194_149.214)] transition-transform transform hover:scale-110 flex items-center justify-center"
            >
              <List size={20} />
            </button>
            {/* Profile */}
            <button
              onClick={() => handleNavigation(`/user-profile`, { email })}
              className="bg-[oklch(0.627_0.194_149.214)] text-white p-3 rounded-full shadow-lg hover:bg-[oklch(0.627_0.194_149.214)] transition-transform transform hover:scale-110 flex items-center justify-center"
            >
              <User size={20} />
            </button>
            {/* Dashboard */}
            <button
              onClick={() => handleNavigation(`/dashboard`, { email })}
              className="bg-[oklch(0.627_0.194_149.214)] text-white p-3 rounded-full shadow-lg hover:bg-[oklch(0.627_0.194_149.214)] transition-transform transform hover:scale-110 flex items-center justify-center"
            >
              <Home size={20} />
            </button>
          </div>
        )}

        {/* Main Menu Button */}
        <button
          onClick={toggleMenu}
          className="bg-[oklch(0.627_0.194_149.214)] text-white p-4 rounded-full shadow-lg hover:bg-[oklch(0.627_0.194_149.214)] transition-transform transform hover:scale-110"
        >
          {isMenuOpen ? <Home size={24} /> : <List size={24} />}
        </button>
      </div>

      <div className="flex-grow-1">
        <section
          className="hero bg-[oklch(0.871_0.15_154.449)] text-white text-center d-flex align-items-center justify-content-center"
          style={{
            minHeight: "50vh",
            backgroundImage: `url(${BackgroundForADA})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="container mt-20 ">
            <h1 className="display-4 display-md-3 mt-20 display-lg-2">
              Shaping Ajmer’s Future with Sustainable Development
            </h1>
            <p className="lead lead-md lead-lg">
              Ensuring planned urban growth, infrastructure enhancement, and
              heritage preservation.
            </p>
            <a
              href="/projects"
              className="custom-btn btn btn-light text-decoration-none mt-3"
            >
              View Projects
            </a>
            <a
              href="/schemes"
              className="custom-btn btn btn-light text-decoration-none mt-3 mx-2"
            >
              View Schemes
            </a>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="highlights py-5 mt-5">
          <div className="container">
            <h2 className="relative inline-block w-[40%] text-center  py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
              Key Highlights
            </h2>
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
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                  <div
                    className="h-100 p-4 rounded"
                    style={{
                      border: "2px solid oklch(0.792 0.209 151.711)",
                      color: "white",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "translateY(-5px)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "translateY(0)")
                    }
                  >
                    <div className="card-body text-center">
                      <h3 className="card-title text-black h5">{item.title}</h3>
                      <p className="card-text">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about py-5 mt-5">
          <div className="container">
            <h2 className="relative inline-block w-[40%] text-center  py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
              About Ajmer Development
            </h2>

            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-sm-12 mb-4">
                <div className="about-card text-center h-100">
                  <div className="card-body">
                    <p className="card-text">
                      Ajmer is a city of historical and cultural significance,
                      and we are committed to its sustainable development. Our
                      initiatives focus on preserving heritage while promoting
                      modern infrastructure and smart city solutions.
                    </p>
                    <a
                      href="/about"
                      className="custom-btn btn btn-light text-decoration-none mt-3"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects py-10 mt-10 border-y border-[oklch(0.627_0.194_149.214)]">
          <div className="container mx-auto px-4">
            <h2 className="relative inline-block w-[40%] text-center  py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
              Our Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <Building2 className="w-12 h-12 mx-auto mb-4 text-[oklch(0.627_0.194_149.214)]" />
                  ),
                  title: "Road Expansion & Urban Mobility",
                  text: "Modernizing and expanding city roads to ease traffic congestion and improve public transport efficiency. Focused on smart traffic systems and pedestrian safety.",
                },
                {
                  icon: (
                    <Landmark className="w-12 h-12 mx-auto mb-4 text-[oklch(0.627_0.194_149.214)]" />
                  ),
                  title: "Heritage & Cultural Restoration",
                  text: "Reviving Ajmer’s iconic historical landmarks and monuments while preserving their rich cultural heritage. Focus on tourism, heritage walks, and public awareness.",
                },
                {
                  icon: (
                    <TreePine className="w-12 h-12 mx-auto mb-4 text-[oklch(0.627_0.194_149.214)]" />
                  ),
                  title: "Eco Parks & Green Initiatives",
                  text: "Development of public parks, eco-friendly zones, and green belts for a healthier environment. Emphasizing urban forestry and water conservation.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[oklch(0.627_0.194_149.214)] bg-white shadow-md hover:shadow-xl transition duration-300 p-6 text-center h-full flex flex-col justify-between"
                >
                  <div>
                    {item.icon}
                    <h3 className="text-xl font-semibold text-black mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Fixed at Bottom */}
      {/* Uncomment the footer if you need it */}
      {/* <Footer className="mt-auto" /> */}
    </div>
  );
});

HomePage.propTypes = {};

export default HomePage;
