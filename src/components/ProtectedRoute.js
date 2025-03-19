import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, false = not auth, true = auth

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:4500/api/auth/check", {
          method: "GET",
          credentials: "include", // VERY IMPORTANT for cookies
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setIsAuthenticated(true); // Authenticated
          } else {
            setIsAuthenticated(false); // Not authenticated
          }
        } else {
          setIsAuthenticated(false); // Token invalid or other error
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false); // On error, assume not authenticated
      }
    };

    checkAuth(); // Call function to check authentication
  }, []);

  if (isAuthenticated === null) {
    // Loading state
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access
  return children;
};

export default ProtectedRoute;
