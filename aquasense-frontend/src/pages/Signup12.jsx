

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSignup = async (e) => {
  //   e.preventDefault();

  //   if (!name || !email || !password || !confirmPassword) {
  //     alert('Please fill in all fields.');
  //     return;
  //   }
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match.');
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await axios.post('http://localhost:5000/api/signup', {
  //       name,
  //       email,
  //       password
  //     });

  //     if (response.status === 200) {
  //       const { token, user } = response.data;
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('user', JSON.stringify(user));

  //       alert('Signup successful! Redirecting...');
  //       navigate('/questionnaire');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     if (error.response && error.response.data.message) {
  //       alert(`Error: ${error.response.data.message}`);
  //     } else {
  //       alert('Signup failed. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/'
    : process.env.REACT_APP_BACKEND_URL || 'https://aqua-ppr5.onrender.com/';

const handleSignup = async (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post(`${BACKEND_URL}api/signup`, {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Signup successful! Redirecting...');
      navigate('/questionnaire');
    }
  } catch (error) {
    console.error(error);
    if (error.response?.data?.message) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert('Signup failed. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left Side */}
      <div
        className="w-1/2 hidden lg:flex flex-col justify-between bg-cover bg-center rounded-r-3xl p-8 animate-slideLeft"
        style={{ backgroundImage: "url('bg-wave.webp')" }}
      >
        <div className="flex justify-end">
          <a
            href="/"
            className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition"
          >
            ← Back
          </a>
        </div>

        <div className="text-center mb-20">
          <h1 className="text-3xl font-semibold animate-fadeIn">💧 AquaSense — Save Every Drop</h1>
          <p className="text-sm mt-2 text-gray-200 animate-fadeIn animate-fadeInDelay1">
            Join the movement to track, reduce, and optimize your water usage.
          </p>
        </div>
      </div>

      {/* Right Side with Form */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-12 animate-pop"
      >
        <form onSubmit={handleSignup} className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-4 animate-fadeIn animate-fadeInDelay1">
            <img
              src="Logo.jpg"
              alt="AquaSense Logo"
              className="w-20 h-20 rounded-full object-cover shadow-lg"
            />
          </div>

          <h2 className="text-3xl font-bold text-white text-center animate-fadeIn animate-fadeInDelay2">
            Create your AquaSense account
          </h2>
          <p className="text-sm text-gray-400 text-center animate-fadeIn animate-fadeInDelay3">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-400 hover:underline">
              Sign In
            </a>
          </p>

          {/* Inputs with staggered fade + slideUp */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 animate-fadeIn animate-fadeInDelay1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 animate-fadeIn animate-fadeInDelay2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 animate-fadeIn animate-fadeInDelay3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 animate-fadeIn animate-fadeInDelay3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 transition animate-fadeIn animate-fadeInDelay3"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
