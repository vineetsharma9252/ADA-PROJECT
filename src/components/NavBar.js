import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link for routing
import { FaRegUser } from "react-icons/fa"; // Import FaRegUser icon
import myImage from '../smjLogo.png';

import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get username and token from localStorage
  const userName = localStorage.getItem("firstName") || "Welcome"; // This should now work
  const token = localStorage.getItem("Token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("Token");
    localStorage.removeItem("firstName");
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="bg-white shadow-md  w-full z-50 top-0 left-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={myImage}
            className="h-20 w-10"
            alt=""
          />
          <div className=" text-black py-4 px-6 text-center ">
            <h1 className="text-2xl font-bold uppercase">Ajmer Development Authority</h1>
            <p className="text-sm govText font-normal text-left mt-1">Government of Rajasthan</p>
           
          </div>
        </Link>

        {/* Profile Section */}
        <div className="flex items-center space-x-3">
          <FaRegUser className="w-8 h-8 text-gray-600" />
          <span className="hidden profileName md:block text-gray-900 font-medium">
            {userName}
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
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
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
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

        {/* Navigation Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:block w-full md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:flex-row md:space-x-6 md:p-0">
            <li>
              <Link
                to="/"
                className="block py-2 text-decoration-none px-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-4 text-decoration-none text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:border-0 md:hover:text-blue-700"
              >
                About
              </Link>
            </li>
            <li>
              {token && (
                <button
                  onClick={handleLogout}
                  className="block py-2 px-4 logOutBtn text-gray-900 rounded hover:bg-red-100 md:hover:bg-transparent md:border-0 md:hover:text-red-500"
                >
                  Log out
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default NavBar;
