
// import { useNavigate } from 'react-router-dom';
// import React from 'react';

// export default function Header({ onMenuClick }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // clear any auth tokens or user data
//     localStorage.removeItem('token');  // example

//     // redirect to logged out page
//     navigate('/loggedout');
//   };

//   return (
//     <header className="flex items-center justify-between bg-indigo-700 text-white px-6 py-4 shadow-md" role="banner">
//       <button
//         type="button"
//         className="md:hidden text-white text-3xl"
//         onClick={onMenuClick}
//         aria-label="Toggle menu"
//         aria-expanded="false"
//       >
//         ☰
//       </button>

//       <div className="flex items-center space-x-3">
//         <img
//           src="Logo.jpg" // Replace with your actual path
//           alt="AquaSense Logo"
//           className="w-8 h-8 rounded-full"
//         />
//         <h1 className="text-2xl font-bold">AquaSense</h1>
//       </div>

//       <div className="hidden md:flex items-center space-x-4">
//         <div
//           className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold"
//           aria-label="User profile"
//           role="img"
//         >
//           U
//         </div>
//         <button
//           type="button"
//           className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Header({ onMenuClick }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/loggedout');
//   };

//   return (
//     <header className="flex items-center justify-between bg-indigo-700 text-white px-6 py-4 shadow-md" role="banner">
      
//       {/* Left: Menu and Logo */}
//       <div className="flex items-center space-x-4">
//         <button
//           type="button"
//           className="md:hidden text-white text-3xl"
//           onClick={onMenuClick}
//           aria-label="Toggle menu"
//         >
//           ☰
//         </button>

//         <div className="flex items-center space-x-2">
//           <img
//             src="Logo.jpg"
//             alt="AquaSense Logo"
//             className="w-10 h-10 rounded-full border-2 border-white shadow animate-pop"
//           />
//           <h1 className="text-2xl font-extrabold animate-pulse">AquaSense</h1>
//         </div>
//       </div>

//       {/* Center: Static Welcome */}
//       <div className="hidden md:flex items-center text-white text-sm font-medium tracking-wide animate-fadeIn">
//         Welcome to AquaSense 💧
//       </div>

//       {/* Right: Logout */}
//       <div className="flex items-center space-x-3">
//         <button
//           onClick={handleLogout}
//           className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/loggedout');
  };

  return (
    <header className="flex items-center justify-between bg-indigo-700 text-white px-6 py-4 shadow-md" role="banner">
      
      {/* Left: Menu and Logo */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="md:hidden text-white text-3xl"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="flex items-center space-x-2">
          <img
            src="Logo.jpg"
            alt="AquaSense Logo"
            className="w-10 h-10 rounded-full border-2 border-white shadow animate-pop"
          />
          <h1 className="text-2xl font-extrabold animate-pulse">AquaSense</h1>
        </div>
      </div>

      {/* Center: Static Welcome */}
      <div className="hidden md:flex items-center text-white text-sm font-medium tracking-wide animate-fadeIn">
        Welcome to AquaSense 💧
      </div>

      {/* Right: Avatar + Logout */}
      <div className="flex items-center space-x-4">
        <img
          src="Avatar.jpg" // ✅ Adjust path if using `public/` folder
          alt="User Avatar"
          className="w-9 h-9 rounded-full border-2 border-white shadow"
        />
        <button
          onClick={handleLogout}
          className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
