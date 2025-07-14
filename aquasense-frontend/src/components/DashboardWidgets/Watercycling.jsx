// import React, { useState } from 'react';

// export default function Watercycling({ dailyUsage = 150 }) {
//   const [rainwater, setRainwater] = useState('');
//   const [greywater, setGreywater] = useState('');

//   const safeNumber = (value) => (isNaN(Number(value)) || value === '' ? 0 : Number(value));
//   const totalRecycled = safeNumber(rainwater) + safeNumber(greywater);
//   const percentageSaved = dailyUsage === 0 ? 0 : ((totalRecycled / dailyUsage) * 100).toFixed(1);

//   return (
//     <div
//       className="bg-gradient-to-br from-white via-green-50 to-green-100 p-6 rounded-2xl shadow-lg max-w-md mx-auto"
//       role="region"
//       aria-label="Water Recycling Tracker"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-green-700">🔁 Water Recycling Tracker</h2>

//       <div className="space-y-6">
//         <div>
//           <label htmlFor="rainwater" className="block font-semibold mb-1 text-green-800">
//             Rainwater Harvested (liters):
//           </label>
//           <input
//             id="rainwater"
//             type="number"
//             min="0"
//             step="any"
//             value={rainwater}
//             onChange={(e) => setRainwater(e.target.value)}
//             className="w-full mt-1 px-5 py-3 border border-green-300 rounded-lg bg-green-50
//                        focus:outline-none focus:ring-4 focus:ring-green-400 transition"
//             aria-describedby="rainwater-desc"
//             placeholder="0"
//           />
//           <div id="rainwater-desc" className="sr-only">
//             Enter the amount of rainwater harvested in liters.
//           </div>
//         </div>

//         <div>
//           <label htmlFor="greywater" className="block font-semibold mb-1 text-green-800">
//             Greywater Reused (liters):
//           </label>
//           <input
//             id="greywater"
//             type="number"
//             min="0"
//             step="any"
//             value={greywater}
//             onChange={(e) => setGreywater(e.target.value)}
//             className="w-full mt-1 px-5 py-3 border border-green-300 rounded-lg bg-green-50
//                        focus:outline-none focus:ring-4 focus:ring-green-400 transition"
//             aria-describedby="greywater-desc"
//             placeholder="0"
//           />
//           <div id="greywater-desc" className="sr-only">
//             Enter the amount of greywater reused in liters.
//           </div>
//         </div>

//         <div
//           className="mt-6 p-4 bg-green-100 rounded-lg border border-green-200"
//           aria-live="polite"
//           aria-atomic="true"
//         >
//           <p className="text-2xl font-extrabold text-green-700">
//             ♻️ Total Recycled: <span className="text-green-900">{totalRecycled} liters</span>
//           </p>
//           <p className="mt-1 text-sm text-green-800">
//             That's <strong>{percentageSaved}%</strong> of your estimated daily usage!
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

export default function Watercycling({ dailyUsage = 150 }) {
  const [rainwater, setRainwater] = useState('');
  const [greywater, setGreywater] = useState('');

  const safeNumber = (value) => (isNaN(Number(value)) || value === '' ? 0 : Number(value));
  const totalRecycled = safeNumber(rainwater) + safeNumber(greywater);
  const percentageSaved = dailyUsage === 0 ? 0 : ((totalRecycled / dailyUsage) * 100).toFixed(1);

  return (
    <div
  className="bg-gradient-to-br from-white via-green-50 to-green-100 p-6 rounded-2xl shadow-lg max-w-xl w-full mx-auto min-h-[460px]"
  role="region"
  aria-label="Water Recycling Tracker"
>

      <h2 className="text-2xl font-bold mb-6 text-green-700">🔁 Water Recycling Tracker</h2>

      <div className="space-y-10 pb-10">
        <div>
          <label htmlFor="rainwater" className="block font-semibold mb-1 text-green-800">
            Rainwater Harvested (liters):
          </label>
          <input
            id="rainwater"
            type="number"
            min="0"
            step="any"
            value={rainwater}
            onChange={(e) => setRainwater(e.target.value)}
            className="w-full mt-1 px-5 py-3 border border-green-300 rounded-lg bg-green-50
                       focus:outline-none focus:ring-4 focus:ring-green-400 transition"
            aria-describedby="rainwater-desc"
            placeholder="0"
          />
          <div id="rainwater-desc" className="sr-only">
            Enter the amount of rainwater harvested in liters.
          </div>
        </div>

        <div>
          <label htmlFor="greywater" className="block font-semibold mb-1 text-green-800">
            Greywater Reused (liters):
          </label>
          <input
            id="greywater"
            type="number"
            min="0"
            step="any"
            value={greywater}
            onChange={(e) => setGreywater(e.target.value)}
            className="w-full mt-1 px-5 py-3 border border-green-300 rounded-lg bg-green-50
                       focus:outline-none focus:ring-4 focus:ring-green-400 transition"
            aria-describedby="greywater-desc"
            placeholder="0"
          />
          <div id="greywater-desc" className="sr-only">
            Enter the amount of greywater reused in liters.
          </div>
        </div>

        <div
          className="mt-6 p-4 bg-green-100 rounded-lg border border-green-200"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-2xl font-extrabold text-green-700">
            ♻ Total Recycled: <span className="text-green-900">{totalRecycled} liters</span>
          </p>
          <p className="mt-1 text-sm text-green-800">
            That's <strong>{percentageSaved}%</strong> of your estimated daily usage!
          </p>
          <div className="mt-6 text-sm text-green-700 italic">
  Every drop counts! 🌿 Try installing greywater systems to save more.
</div>
        </div>
      </div>
    </div>
  );
}