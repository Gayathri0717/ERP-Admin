
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Logo from '../components/paarampariyaa_logo.png';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/login`, { email, password });
      const token = response.data.token;

      // Check if the token is present in the response
      if (token) {
        // Save the token to localStorage
        localStorage.setItem('authToken', token);
        console.log('Token stored:', token);

        // Assuming the response contains the user email and userId
        const userEmail = response.data.user.email;
        const userId = response.data.user._id;

        // Save email and userId to localStorage
        localStorage.setItem('email', userEmail);
        localStorage.setItem('userId', userId);

        // Redirect to the admin dashboard after successful login
        navigate('/admin/dashboard');
      } else {
        // Handle login failure
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <main className="w-full mt-12 sm:pt-20 sm:mt-0">
      <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
        <div className="loginSidebar bg-radial-white-black p-10 pr-12 hidden sm:flex flex-col items-center justify-center gap-4 w-2/5">
        <img
              src={Logo}
              alt="Param Logo"
              className="h-[40px] md:h-[80px] cursor-pointer mx-auto md:mt-20 mb-10"
              onClick={() => navigate('/admin/dashboard')}
            />
          <h1 className="font-medium text-white text-3xl text-center">Login</h1>
          <p className="text-gray-200 text-lg text-center">Get access to your Orders, Wishlist, and Recommendations</p>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="text-center py-10 px-4 sm:px-14">
            
            <form onSubmit={handleLogin}> {/* Use onSubmit here to handle form submission */}
              <div className="flex flex-col w-full gap-4">
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="relative">
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'} // Toggle password visibility
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div 
                    className="absolute right-2 top-2 cursor-pointer" 
                    onClick={() => setShowPassword(!showPassword)} // Toggle visibility on click
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} {/* Show appropriate icon */}
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 mt-2 mb-32">
                  <button 
                    type="submit" // Change button type to submit
                    className="text-white py-3 w-full bg-[#041435] shadow hover:shadow-lg rounded-sm font-medium">
                    Login
                  </button>
                  {/* <Link to="/password/forgot" className=" bg-[#041435] text-white text-center py-3 w-full shadow border rounded-sm font-medium">
                    Forgot Password?
                  </Link> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;