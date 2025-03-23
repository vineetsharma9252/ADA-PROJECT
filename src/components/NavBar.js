import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import myImage from "../smjLogo.png";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState({
    phone: "",
    email: "",
    aadhar: "",
    fullName: "",
    father_name: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Combined useEffect to Fetch User Profile and Aadhar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user profile data
        const profileResponse = await fetch("http://localhost:4500/user-data", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        // Fetch aadhar data
        const aadharResponse = await fetch("http://localhost:4500/getAadhar", {
          method: "GET",
          credentials: "include",
        });

        if (!profileResponse.ok || !aadharResponse.ok) {
          throw new Error("Failed to fetch user data");
        }

        const profileData = await profileResponse.json();
        const aadharData = await aadharResponse.json();

        setUserData({
          phone: profileData.phone,
          email: profileData.email,
          fullName: profileData.fullName,
          aadhar: aadharData.aadharCard,
          father_name: profileData.father_name,
        });

        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to fetch user data:", err.message);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Toggle Menu (Mobile)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Logout Handler
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4500/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        alert("Logged out successfully");
        setUserData({ phone: "", email: "", aadhar: "", fullName: "" });
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Login Handler
  const handleLogin = () => navigate("/login");

  // Profile Click Handler
  const handleProfileClick = (e) => {
    e.preventDefault();
    const { email, father_name } = userData;
    if (father_name === "" && !father_name) {
      alert("Please complete your profile first.");
      navigate("/user-profile");
    } else {
      navigate("/user-page", { state: { email } });
    }
  };

  return (
    <nav className="shadow-md w-full z-50 top-0 left-0 bg-[#4b0082]">
      <div className="max-w-screen-xl mx-auto px-4 relative">
        {isLoading ? (
          <div className="animate-pulse p-4">
            <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        ) : (
          <>
            {/* ------- Mobile Layout -------- */}
            <div className="md:hidden flex flex-col py-2 relative">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center">
                  <img
                    src={myImage}
                    className="h-16 w-16 object-contain"
                    alt="Logo"
                  />
                  <div className="text-white ml-2">
                    <h1 className="text-lg font-bold uppercase">
                      Ajmer Development Authority
                    </h1>
                    <p className="text-xs">Government of Rajasthan</p>
                  </div>
                </Link>

                <div className="flex items-center space-x-2">
                  {isLoggedIn && (
                    <Link
                      onClick={handleProfileClick}
                      className="text-white"
                    >
                      <FaRegUser className="w-6 h-6" />
                    </Link>
                  )}
                  <button onClick={toggleMenu} className="w-8 h-8 text-white">
                    {isMenuOpen ? (
                      <svg
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
                        fill="none"
                        viewBox="0 0 17 14"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h15M1 7h15M1 13h15"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {isMenuOpen && (
                <div className="mt-2 bg-[#f5f5dc] rounded-lg shadow-md">
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 hover:bg-[#4b0082] hover:text-white"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-4 hover:bg-[#4b0082] hover:text-white"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      {isLoggedIn ? (
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left py-2 px-4 hover:bg-red-600 hover:text-white"
                        >
                          Logout
                        </button>
                      ) : (
                        <button
                          onClick={handleLogin}
                          className="block w-full text-left py-2 px-4 hover:bg-green-600 hover:text-white"
                        >
                          Login
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* ------- Desktop Layout -------- */}
            <div className="hidden md:flex justify-between items-center py-3">
              <Link to="/" className="flex items-center space-x-3">
                <img src={myImage} className="h-20 w-20" alt="Logo" />
                <div className="text-white">
                  <h1 className="text-2xl font-bold uppercase">
                    Ajmer Development Authority
                  </h1>
                  <p className="text-sm">Government of Rajasthan</p>
                </div>
              </Link>

              <div className="flex items-center space-x-6">
                <ul className="flex space-x-4">
                  <li>
                    <Link
                      to="/"
                      className="py-2 px-4 text-white hover:bg-[#6a1b9a] rounded-lg"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="py-2 px-4 text-white hover:bg-[#6a1b9a] rounded-lg"
                    >
                      About
                    </Link>
                  </li>
                </ul>
                {isLoggedIn && (
                  <Link
                    onClick={handleProfileClick}
                    className="flex items-center space-x-1 text-white"
                  >
                    <FaRegUser className="w-5 h-5" />
                    <span>{userData.fullName}</span>
                  </Link>
                )}

                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="py-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="py-1 px-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;