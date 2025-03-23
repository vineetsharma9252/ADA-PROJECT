import React, { memo, useState, useEffect } from "react";
import { Building2, Landmark, TreePine, Home, User, List } from "lucide-react"; // Added icons
import PropTypes from "prop-types";
import "./HomePageCSS.css";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import BackgroundForADA from "../assets/Digitalbanner.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import smartcity from "../assets/smartcity.jpg";
import road from "../assets/road-project.jpeg";
import eco from "../assets/eco.jpg";
import heritage from "../assets/heritage.jpg";

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
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#f5f5dc" }}
    >
      {/* Floating Menu Button */}
      <div className="fixed bottom-8 right-8" style={{ zIndex: 1000 }}>
        {/* Menu Items */}
        {isMenuOpen && (
          <div className="flex flex-col items-end mb-2 space-y-2">
            {/* Schemes */}
            <button
              onClick={() => handleNavigation("/schemes")}
              className="bg-[#4b0082] text-white p-3 rounded-full shadow-lg hover:bg-[#4b0082] transition-transform transform hover:scale-110 flex items-center justify-center"
            >
              <List size={20} />
            </button>
            {/* Profile */}
            <button
              onClick={() => handleNavigation(`/user-profile`, { email })}
              className="bg-[#4b0082] text-white p-3 rounded-full shadow-lg hover:bg-[#4b0082] transition-transform transform hover:scale-110 flex items-center justify-center"
            >
              <User size={20} />
            </button>
            {/* Dashboard */}
            <button
              onClick={() => handleNavigation(`/dashboard`, { email })}
              className="bg-[#4b0082] text-white p-3 rounded-full shadow-lg hover:bg-[#4b0082] transition-transform transform hover:scale-110 flex items-center justify-center"
            >
              <Home size={20} />
            </button>
          </div>
        )}

        <button
          onClick={toggleMenu}
          className="bg-[#4b0082] text-white p-4 rounded-full shadow-lg hover:bg-[#4b0082] transition-transform transform hover:scale-110"
        >
          {isMenuOpen ? <Home size={24} /> : <List size={24} />}
        </button>
      </div>

      <div className="flex-grow-1">
        <section
          className="hero text-white text-center d-flex align-items-center justify-content-center"
          style={{
            minHeight: "78vh",
            backgroundImage: `url(${BackgroundForADA})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "#4b0082",
          }}
        >
          <div className="container mt-10">
            <h1 className="display-4 display-md-3 mt-10 display-lg-2 font-bold tracking-wide">
              Shaping Ajmer’s Future with Sustainable Development
            </h1>
            <p className="lead lead-md lead-lg font my-2">
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
        <section className="container mx-auto px-4 mt-10">
          <h2 className="relative inline-block w-[40%] text-center py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#4b0082] after:transition-all after:duration-500 hover:after:w-full">
            Key Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Ongoing Projects",
                text: "Infrastructure development, road construction, and urban beautification.",
              },
              {
                icon: (
                  <Landmark className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Tenders & Notices",
                text: "Check the latest government tenders and contracts.",
              },
              {
                icon: (
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Urban Development",
                text: "Plans for smart city initiatives and sustainable growth.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#4b0082] bg-white shadow-md hover:shadow-xl transition duration-300 p-6 text-center h-full flex flex-col justify-between"
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
        </section>

        {/* About Section */}
        <section className="container mx-auto px-4 mt-10">
          <h2 className="relative inline-block w-[40%] text-center py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#4b0082] after:transition-all after:duration-500 hover:after:w-full">
            About Ajmer Development
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Heritage Preservation",
                text: "Ajmer is a city of historical and cultural significance, and we are committed to its sustainable development.",
              },
              {
                icon: (
                  <Landmark className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Modern Infrastructure",
                text: "Our initiatives focus on preserving heritage while promoting modern infrastructure and smart city solutions.",
              },
              {
                icon: (
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Sustainable Growth",
                text: "Development of public parks, eco-friendly zones, and green belts for a healthier environment.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#4b0082] bg-white shadow-md hover:shadow-xl transition duration-300 p-6 text-center h-full flex flex-col justify-between"
              >
                <div>
                  {item.icon}
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.text}</p>
                </div>
                <a
                  href="/about"
                  className="custom-btn btn btn-light text-decoration-none mt-3"
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="container mx-auto px-4 mt-10">
          <h2 className="relative inline-block w-[40%] text-center py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#4b0082] after:transition-all after:duration-500 hover:after:w-full">
            Our Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Road Expansion & Urban Mobility",
                text: "Modernizing and expanding city roads to ease traffic congestion and improve public transport efficiency. Focused on smart traffic systems and pedestrian safety.",
              },
              {
                icon: (
                  <Landmark className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Heritage & Cultural Restoration",
                text: "Reviving Ajmer’s iconic historical landmarks and monuments while preserving their rich cultural heritage. Focus on tourism, heritage walks, and public awareness.",
              },
              {
                icon: (
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Eco Parks & Green Initiatives",
                text: "Development of public parks, eco-friendly zones, and green belts for a healthier environment. Emphasizing urban forestry and water conservation.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#4b0082] bg-white shadow-md hover:shadow-xl transition duration-300 p-6 text-center h-full flex flex-col justify-between"
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
        </section>

        {/* Latest News Section */}
        <section className="container mx-auto px-4 mt-10">
          <h2 className="relative inline-block w-[40%] text-center py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#4b0082] after:transition-all after:duration-500 hover:after:w-full">
            Latest News
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "New Park Inauguration",
                text: "A new eco-friendly park has been inaugurated in the city center, promoting green spaces and community activities.",
              },
              {
                icon: (
                  <Landmark className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Smart City Initiative",
                text: "Ajmer has been selected for the Smart City initiative, focusing on sustainable urban development and smart infrastructure.",
              },
              {
                icon: (
                  <TreePine className="w-12 h-12 mx-auto mb-4 text-[#4b0082]" />
                ),
                title: "Heritage Walk",
                text: "Join us for a heritage walk to explore the rich cultural history of Ajmer and its iconic landmarks.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-[#4b0082] bg-white shadow-md hover:shadow-xl transition duration-300 p-6 text-center h-full flex flex-col justify-between"
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
        </section>

        {/* Carousel Section */}
        <section className="container mx-auto px-4 mt-20 mb-10">
          <h2 className="relative inline-block w-[40%] text-center py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#4b0082] after:transition-all after:duration-500 hover:after:w-full">
            New Projects
          </h2>

          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {[
              {
                image: road,
                title: "Road Expansion",
                description: "Modernizing city roads for better traffic flow.",
              },
              {
                image: heritage,
                title: "Heritage Restoration",
                description:
                  "Reviving historical landmarks in Ajmer. and preserve the traditions ",
              },
              {
                image: eco,
                title: "Eco Parks",
                description:
                  "Creating green spaces for a healthier environment.",
              },
              {
                image: smartcity,
                title: "Smart City",
                description: "Implementing smart infrastructure solutions.",
              },
            ].map((item, index) => (
              <SwiperSlide key={index}>
                <div className="rounded-xl border border-[#4b0082] bg-white shadow-md hover:shadow-xl transition duration-300 p-6 text-center h-full flex flex-col justify-between">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
