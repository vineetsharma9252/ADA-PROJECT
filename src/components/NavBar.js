import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import myImage from "../smjLogo.png";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userName = localStorage.getItem("fullName") || "Welcome";
  const token = localStorage.getItem("token");
  let email = localStorage.getItem("email");
  // email = email.replace(/"/g, "");
  const phone = localStorage.getItem("phone");
  const aadharCard = localStorage.getItem("aadharCard");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogout = () => {
    localStorage.clear(); // remove all tokens and details
    alert("Logged out successfully!");
    navigate("/login");
  };
  const handleLogin = () => navigate("/login");

  // ✅ Common profile click function
  const handleProfileClick = (e) => {
    e.preventDefault(); // Prevent default link navigation
    if (!phone || !aadharCard || phone === "null" || aadharCard === "null") {
      alert(
        "Please complete your profile (Aadhar Card and Phone number are required)."
      );
      navigate("/user-profile"); // Redirect to complete profile
    } else {
      navigate(`/user-profile/api/data/${email}`); // If completed, go to profile page
    }
  };

  return (
    <nav className="shadow-md w-full z-50 top-0 left-0 relative">
      <div className="max-w-screen-xl mx-auto px-2 relative">
        {/* ----------- Mobile Layout ------------ */}
        <div className="md:hidden flex flex-col py-2 relative">
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center">
              <img
                src={myImage}
                className="h-20 w-20 object-contain"
                alt="Logo"
              />
              <div className="text-white py-4 px-4 text-center">
                <h1 className="text-1xl font-bold uppercase">
                  Ajmer Development Authority
                </h1>
                <p className="text-sm text-white govText font-normal mt-1">
                  Government of Rajasthan
                </p>
              </div>
            </Link>
          </div>

          {/* Profile Name, Login & Hamburger Menu */}
          <div className="w-full flex items-center justify-between mt-2 px-2 relative">
            {token && (
              <Link to="/user-profile" onClick={handleProfileClick}>
                {/* Profile Name */}
                <div className="flex items-center space-x-1">
                  <FaRegUser className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{userName}</span>
                </div>
              </Link>
            )}
            <div className="flex items-center space-x-2">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="py-1 px-2 text-sm logOutBtn text-white rounded hover:bg-red-100"
                >
                  Log out
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="py-1 px-3 text-sm text-white rounded hover:bg-blue-100"
                >
                  Log in
                </button>
              )}

              {/* Hamburger Button */}
              <button
                onClick={toggleMenu}
                type="button"
                className="px-1.5 w-9 h-9 text-gray-600 rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
              >
                {isMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 17 14">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-2 top-14 w-80 bg-white shadow-lg rounded-lg py-2 z-50">
                <ul className="flex flex-col space-y-2">
                  <li>
                    <Link
                      to="/"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-2 text-white hover:bg-blue-100"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 px-2 text-white hover:bg-blue-100"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ----------- Desktop Layout ------------ */}
        <div className="hidden md:flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <img src={myImage} className="h-20 w-20" alt="Logo" />
            <div className="text-black py-4 px-6 text-center">
              <h1 className="text-2xl font-bold text-white uppercase">
                Ajmer Development Authority
              </h1>
              <p className="text-sm govText text-white font-normal mt-1">
                Government of Rajasthan
              </p>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            {token && (
              <Link to="/user-profile" onClick={handleProfileClick}>
                {/* Profile Name */}
                <div className="flex items-center space-x-1">
                  <FaRegUser className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">{userName}</span>
                </div>
              </Link>
            )}

            {/* Navigation Links */}
            <ul className="font-medium flex items-center space-x-2">
              <li>
                <Link to="/" className="py-2 px-4 text-white hover:bg-blue-200">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="py-2 px-4 text-white hover:bg-gray-200"
                >
                  About
                </Link>
              </li>
              <li>
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 logOutBtn text-white rounded hover:bg-red-100"
                  >
                    Log out
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="py-2 px-4 text-white rounded hover:bg-blue-100"
                  >
                    Log in
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
