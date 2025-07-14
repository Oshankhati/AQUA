

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        alert('Login successful!');
        navigate('/questionnaire');
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white overflow-hidden">
      {/* Left Side with Image */}
      <div
        className="w-1/2 hidden lg:flex flex-col justify-between bg-cover bg-center rounded-r-3xl p-8 animate-fadeIn"
        style={{ backgroundImage: "url('bg.jpg')" }}
      >
        <div className="flex justify-end">
          <a
            href="/"
            className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700"
          >
            
          </a>
        </div>
        <div className="text-center mb-20">
          <h1 className="text-3xl font-semibold animate-fadeIn">💧 AquaSense — Save Every Drop</h1>
          <p className="text-sm mt-2 text-gray-200 animate-fadeIn delay-100">
            Join the movement to track, reduce, and optimize your water usage.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 text-center animate-slideUp"
        >
          {/* Logo */}
          <img
            src="Logo.jpg"
            alt="AquaSense Logo"
            className="mx-auto w-16 h-16 rounded-full shadow-md border border-gray-700 animate-pop"
          />

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mt-2 animate-fadeIn">
            Sign in to AquaSense
          </h2>
          <p className="text-sm text-gray-400 animate-fadeIn delay-200">
            Don’t have an account?{' '}
            <a href="/signup" className="text-indigo-400 hover:underline">
              Sign Up
            </a>
          </p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 animate-fadeIn delay-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 animate-fadeIn delay-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 transition animate-fadeIn delay-700"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Divider */}
          {/* <div className="text-center text-sm text-gray-400 animate-fadeIn delay-800">or continue with</div> */}

          {/* Social Buttons */}
          {/* <div className="flex space-x-4 animate-fadeIn delay-900">
            <button type="button" className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
              Google
            </button>
            <button type="button" className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800">
              <img src="https://www.svgrepo.com/show/303128/apple-logo.svg" alt="Apple" className="w-5 h-5 mr-2" />
              Apple
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
}
