import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Unauthorized!',
      text: 'Please login to continue.',
      confirmButtonText: 'Go to Login'
    });
    return <Navigate to="/login" />;
  }

  return children; // If logged in, allow access
};

export default ProtectedRoute;
