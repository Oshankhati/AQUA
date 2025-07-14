// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
// // tailwind.config.js
// module.exports = {
//   darkMode: 'class', // Important for theme toggle
//   content: ["./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       animation: {
//         fadeIn: 'fadeIn 1s ease-out',
//         slideDown: 'slideDown 1s ease-out',
//         pop: 'pop 0.4s ease-out',
//         pulse: 'pulse 2s infinite',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0 },
//           '100%': { opacity: 1 },
//         },
//         slideDown: {
//           '0%': { transform: 'translateY(-10px)', opacity: 0 },
//           '100%': { transform: 'translateY(0)', opacity: 1 },
//         },
//         pop: {
//           '0%': { transform: 'scale(0.5)', opacity: 0 },
//           '100%': { transform: 'scale(1)', opacity: 1 },
//         },
//       },
//     },
//   },
//   plugins: [],
// };
// // tailwind.config.js
// module.exports = {
//   content: ["./src/**/*.{js,jsx}"],
//   theme: {
//     extend: {
//       animation: {
//         fadeIn: 'fadeIn 1s ease-out',
//         fadeInDelay: 'fadeIn 1.5s ease-out',
//         fadeInDelay2: 'fadeIn 2s ease-out',
//         fadeInDelay3: 'fadeIn 2.5s ease-out',
//         slideDown: 'slideDown 1s ease-out',
//         pop: 'pop 0.5s ease-out',
//       },
//       keyframes: {
//         fadeIn: {
//           '0%': { opacity: 0 },
//           '100%': { opacity: 1 },
//         },
//         slideDown: {
//           '0%': { transform: 'translateY(-20px)', opacity: 0 },
//           '100%': { transform: 'translateY(0)', opacity: 1 },
//         },
//         pop: {
//           '0%': { transform: 'scale(0.5)', opacity: 0 },
//           '100%': { transform: 'scale(1)', opacity: 1 },
//         },
//       },
//     },
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode via class strategy
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        fadeInDelay: 'fadeIn 1.5s ease-out',
        fadeInDelay2: 'fadeIn 2s ease-out',
        fadeInDelay3: 'fadeIn 2.5s ease-out',
        slideDown: 'slideDown 1s ease-out',
        slideUp: 'slideUp 1s ease-out',
        pop: 'pop 0.5s ease-out',
        pulse: 'pulse 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pop: {
          '0%': { transform: 'scale(0.5)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

