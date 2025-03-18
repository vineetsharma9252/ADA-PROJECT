import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // ✅ Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // ✅ For redirection

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // ✅ useNavigate hook for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4500/forgot-password', { email });
      setMessage(response.data.message);

      // ✅ SweetAlert2 Success Alert
      Swal.fire({
        icon: 'success',
        title: 'Check Your Email',
        text: 'Password reset link has been sent to your email.',
        showConfirmButton: false,
        timer: 2500, // Auto close after 2.5 seconds
      });

      // ✅ Redirect to home page after alert closes
      setTimeout(() => {
        navigate('/');
      }, 2500);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 border-green shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
