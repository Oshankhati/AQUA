// import React from 'react';
// import { NavLink } from 'react-router-dom';

// // Navigation links
// const navItems = [
//   { path: '/Dashboard1', label: 'Dashboard1' },
//   { path: '/Waterusageoverview', label: 'Water Usage Overview' },
//   { path: '/Waterinput', label: 'Water Input' },
//   { path: '/Usagequota', label: 'Usage Quota' },
//   { path: '/Alerts', label: 'Alerts' },
//   { path: '/Optimizationtips', label: 'Optimization Tips' },
//   { path: '/Leaderboard', label: 'Leaderboard' },
//   { path: '/LocationComparison', label: 'Location Comparison' },
//   { path: '/Watercycling', label: 'Water Recycling Tracker' },
//   { path: '/SmartgardernScheduler', label: 'Smart Garden Scheduler' },
//   { path: '/CommunityWall', label: 'Community Wall' },
//   { path: '/ProductSuggestions', label: 'Product Suggestions' },
// ];

// export default function Sidebar({ isOpen, onClose, className = '' }) {
//   return (
//     <>
//       {/* Mobile overlay */}
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${
//           isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
//         }`}
//         onClick={onClose}
//         aria-hidden="true"
//       />

//       {/* Sidebar container */}
//       <aside
//         className={`
//           ${className}
//           fixed md:static top-0 left-0 h-full md:h-auto w-64
//           bg-indigo-700 text-white p-6 flex flex-col
//           transform md:translate-x-0 transition-transform duration-300
//           ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//           z-40
//         `}
//         aria-label="Primary Navigation"
//       >
//         {/* Logo and Title */}
//         <div className="flex items-center space-x-3 mb-8">
//           <img
//             src="Logo.jpg"  // Update with your actual path
//             alt="AquaSense Logo"
//             className="w-8 h-8 rounded-full"
//           />
//           <h1 className="text-2xl font-bold">AquaSense</h1>
//         </div>

//         {/* Navigation Links */}
//         <nav className="flex flex-col space-y-3 flex-1 overflow-auto" role="navigation" tabIndex={0}>
//           {navItems.map(({ path, label }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 `rounded px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
//                   isActive ? 'bg-indigo-900 font-semibold' : 'hover:bg-indigo-600'
//                 }`
//               }
//               end={path === '/Dashboard1'}
//               onClick={onClose}
//             >
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="mt-auto text-sm text-indigo-300">© 2025 AquaSense</div>
//       </aside>
//     </>
//   );
// }
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/Dashboard1', label: 'Dashboard' },
  { path: '/Waterusageoverview', label: 'Water Usage Overview' },
  { path: '/Waterinput', label: 'Water Input' },
  { path: '/Usagequota', label: 'Usage Quota' },
  { path: '/Alerts', label: 'Alerts' },
  { path: '/Optimizationtips', label: 'Optimization Tips' },
  { path: '/Leaderboard', label: 'Leaderboard' },
  { path: '/LocationComparison', label: 'Location Comparison' },
  { path: '/Watercycling', label: 'Water Recycling Tracker' },
  { path: '/SmartgardernScheduler', label: 'Smart Garden Scheduler' },
  { path: '/CommunityWall', label: 'Community Wall' },
  { path: '/productsuggestions', label: 'Product Suggestions' },
];

export default function Sidebar({ isOpen, onClose, className = '' }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`
          ${className}
          bg-indigo-700 text-white p-6 flex flex-col sticky top-0 h-screen transition-transform duration-300 z-40
        `}
        aria-label="Primary Navigation"
      >
        {/* Top row: Logo and Close Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">AquaSense</h1>
          <button
            onClick={onClose}
            className="text-white text-2xl focus:outline-none hover:text-gray-300"
            title="Hide Sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M588-132 440-280l148-148 56 58-50 50h96q29 0 49.5-20.5T760-390q0-29-20.5-49.5T690-460H160v-80h530q63 0 106.5 43.5T840-390q0 63-43.5 106.5T690-240h-96l50 50-56 58ZM160-240v-80h200v80H160Zm0-440v-80h640v80H160Z"/></svg>
          </button>
        </div>

        <nav className="flex flex-col space-y-3 flex-1 overflow-auto" role="navigation" tabIndex={0}>
          {navItems.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `rounded px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isActive ? 'bg-indigo-900 font-semibold' : 'hover:bg-indigo-600'
                }`
              }
              end={path === '/Dashboard1'}
              onClick={onClose}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto text-sm text-indigo-300">© 2025 AquaSense</div>
      </aside>
    </>
  );
}