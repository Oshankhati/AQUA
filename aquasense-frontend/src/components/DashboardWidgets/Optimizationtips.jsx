import React, { useState } from 'react';

const tips = [
  'Turn off the tap while brushing to save up to 8 liters of water per minute.',
  'Use a bucket instead of a hose to wash your car and save water.',
  'Fix leaking faucets immediately to prevent water waste.',
  'Water your plants early in the morning or late in the evening to minimize evaporation.',
  'Collect rainwater to use for gardening and cleaning.',
  'Install aerators on faucets to reduce water flow without losing pressure.',
  'Run dishwashers and washing machines only with full loads.',
  'Insulate your water pipes to get hot water faster and avoid waste.',
  'Use drought-resistant plants in your garden to minimize watering needs.',
  'Avoid overwatering lawns – once or twice a week is usually sufficient.',
  'Use a broom, not a hose, to clean driveways and sidewalks.',
  'Check your toilet for silent leaks using food coloring in the tank.',
  'Install a dual-flush or low-flow toilet to conserve water.',
  'Capture and reuse leftover drinking water for plants.',
  'Keep a bottle of cold water in the fridge instead of running the tap.',
];

export default function Optimizationtips() {
  const [index, setIndex] = useState(0);

  const nextTip = () => {
    setIndex((prev) => (prev + 1) % tips.length);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-emerald-100 p-8">
      <div className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-lg text-center transition-all duration-300">
        <h2 className="text-3xl font-bold text-emerald-700 mb-4">💡 Water Optimization Tips</h2>
        <div className="text-lg text-gray-700 italic px-4 py-6 bg-emerald-50 border-l-4 border-emerald-400 rounded-md shadow-inner transition-opacity duration-500 ease-in-out">
          {tips[index]}
        </div>
        <button
          onClick={nextTip}
          className="mt-6 bg-emerald-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          aria-label="Next optimization tip"
        >
          Next Tip
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Tip {index + 1} of {tips.length}
        </p>
      </div>
    </div>
  );
}
