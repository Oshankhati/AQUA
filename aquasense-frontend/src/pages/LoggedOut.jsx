import React from 'react';

export default function LoggedOut() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 via-sky-100 to-indigo-200 p-6 animate-fadeIn">
      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl text-center max-w-xl border border-blue-200 transition-all duration-500 transform hover:scale-[1.01] hover:shadow-blue-300">
        
        {/* Logo Image Area */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-white shadow-md border border-blue-200 animate-pop">
          <img
            src="Logo.jpg" // replace with your actual logo path
            alt="AquaSense Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-4 tracking-tight animate-slideDown">
          You’ve Logged Out
        </h1>

        {/* Subheading */}
        <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed animate-fadeInDelay">
          Thank you for staying mindful of your water usage with <span className="text-blue-600 font-semibold">AquaSense</span>.
        </p>

        {/* Additional Farewell Message */}
        <p className="text-base text-gray-600 font-normal leading-relaxed animate-fadeInDelay2">
          We hope you continue making conscious choices for a better, more sustainable future. 🌍💙
        </p>

        <p className="text-sm text-gray-500 italic mt-6 animate-fadeInDelay3">
          See you again soon — refresh yourself and return anytime! 💧
        </p>
      </div>
    </div>
  );
}

