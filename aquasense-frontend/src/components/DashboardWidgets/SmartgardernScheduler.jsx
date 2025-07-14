// import React, { useState } from 'react';

// const daysOfWeek = [
//   'Monday',
//   'Tuesday',
//   'Wednesday',
//   'Thursday',
//   'Friday',
//   'Saturday',
//   'Sunday',
// ];

// export default function SmartgardernScheduler() {
//   const [day, setDay] = useState('Monday');
//   const [time, setTime] = useState('');
//   const [duration, setDuration] = useState('');
//   const [schedules, setSchedules] = useState([]);
//   const [announce, setAnnounce] = useState('');

//   const handleAddSchedule = (e) => {
//     e.preventDefault();

//     if (!time || !duration || Number(duration) <= 0) {
//       alert('Please fill out a valid time and duration (positive number).');
//       return;
//     }

//     const newSchedule = { day, time, duration: Number(duration) };
//     setSchedules((prev) => [...prev, newSchedule]);
//     setTime('');
//     setDuration('');
//     setAnnounce(`Added schedule for ${day} at ${time} for ${duration} minutes.`);
//   };

//   const handleRemove = (index) => {
//     if (window.confirm('Remove this schedule?')) {
//       const updated = [...schedules];
//       const removed = updated.splice(index, 1);
//       setSchedules(updated);
//       setAnnounce(`Removed schedule for ${removed[0].day} at ${removed[0].time}.`);
//     }
//   };

//   return (
//     <div
//       className="bg-gradient-to-br from-white via-green-50 to-green-100 p-6 rounded-2xl shadow-lg max-w-md mx-auto"
//       role="region"
//       aria-label="Smart Garden Scheduler"
//     >
//       <h2 className="text-2xl font-bold mb-6 text-green-700">🌿 Smart Garden Scheduler</h2>

//       {/* Scheduler Form */}
//       <form onSubmit={handleAddSchedule} className="space-y-5 mb-8" aria-live="polite">
//         {/* Day Select */}
//         <div>
//           <label htmlFor="daySelect" className="block font-semibold mb-2 text-green-800">
//             Select Day
//           </label>
//           <select
//             id="daySelect"
//             value={day}
//             onChange={(e) => setDay(e.target.value)}
//             className="w-full border border-green-300 px-4 py-2 rounded-lg bg-green-50
//                        focus:outline-none focus:ring-4 focus:ring-green-400 transition"
//           >
//             {daysOfWeek.map((d) => (
//               <option key={d} value={d}>
//                 {d}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Time Input */}
//         <div>
//           <label htmlFor="timeInput" className="block font-semibold mb-2 text-green-800">
//             Time
//           </label>
//           <input
//             type="time"
//             id="timeInput"
//             value={time}
//             onChange={(e) => setTime(e.target.value)}
//             className="w-full border border-green-300 px-4 py-2 rounded-lg bg-green-50
//                        focus:outline-none focus:ring-4 focus:ring-green-400 transition"
//             required
//             aria-required="true"
//           />
//         </div>

//         {/* Duration Input */}
//         <div>
//           <label htmlFor="durationInput" className="block font-semibold mb-2 text-green-800">
//             Duration (minutes)
//           </label>
//           <input
//             type="number"
//             id="durationInput"
//             min="1"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             placeholder="e.g., 15"
//             className="w-full border border-green-300 px-4 py-2 rounded-lg bg-green-50
//                        focus:outline-none focus:ring-4 focus:ring-green-400 transition"
//             required
//             aria-required="true"
//           />
//         </div>

//         {/* Add Button */}
//         <button
//           type="submit"
//           disabled={!time || !duration || Number(duration) <= 0}
//           className={`w-full py-3 rounded-lg text-white font-semibold transition
//             ${
//               !time || !duration || Number(duration) <= 0
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500'
//             } focus:outline-none`}
//           aria-disabled={!time || !duration || Number(duration) <= 0}
//         >
//           Add Schedule
//         </button>
//       </form>

//       {/* ARIA live region for announcements */}
//       <div role="status" aria-live="polite" className="sr-only">
//         {announce}
//       </div>

//       {/* Schedule List */}
//       <div>
//         <h3 className="font-semibold text-lg mb-4 text-green-700">🗓️ Scheduled Watering Times</h3>
//         {schedules.length === 0 ? (
//           <p className="text-sm text-green-600">No schedules yet.</p>
//         ) : (
//           <ul className="space-y-3">
//             {schedules.map((schedule, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between items-center bg-green-100 p-3 rounded-lg border border-green-200"
//               >
//                 <span className="text-green-900 font-medium">
//                   {schedule.day} at {schedule.time} — {schedule.duration} mins
//                 </span>
//                 <button
//                   onClick={() => handleRemove(index)}
//                   className="text-red-600 hover:text-red-700 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
//                   aria-label={`Remove schedule for ${schedule.day} at ${schedule.time}`}
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function SmartgardernScheduler() {
  const [day, setDay] = useState('Monday');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [announce, setAnnounce] = useState('');

  const handleAddSchedule = (e) => {
    e.preventDefault();

    if (!time || !duration || Number(duration) <= 0) {
      alert('Please fill out a valid time and duration (positive number).');
      return;
    }

    const newSchedule = { day, time, duration: Number(duration) };
    setSchedules((prev) => [...prev, newSchedule]);
    setTime('');
    setDuration('');
    setAnnounce(`Added schedule for ${day} at ${time} for ${duration} minutes.`);
  };

  const handleRemove = (index) => {
    if (window.confirm('Remove this schedule?')) {
      const updated = [...schedules];
      const removed = updated.splice(index, 1);
      setSchedules(updated);
      setAnnounce(`Removed schedule for ${removed[0].day} at ${removed[0].time}.`);
    }
  };

  return (
    <div
      className="bg-gradient-to-br from-white via-green-50 to-green-100 p-6 rounded-2xl shadow-lg max-w-xl w-full mx-auto"
      role="region"
      aria-label="Smart Garden Scheduler"
    >
      <h2 className="text-2xl font-bold mb-4 text-green-700">🌿 Smart Garden Scheduler</h2>

      {/* Scheduler Form */}
      <form onSubmit={handleAddSchedule} className="space-y-5 mb-8" aria-live="polite">
        {/* Day Select */}
        <div>
          <label htmlFor="daySelect" className="block font-semibold mb-2 text-green-800">
            Select Day
          </label>
          <select
            id="daySelect"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full border border-green-300 px-4 py-2 rounded-lg bg-green-50
                       focus:outline-none focus:ring-4 focus:ring-green-400 transition"
          >
            {daysOfWeek.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Time Input */}
        <div>
          <label htmlFor="timeInput" className="block font-semibold mb-2 text-green-800">
            Time
          </label>
          <input
            type="time"
            id="timeInput"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-green-300 px-4 py-2 rounded-lg bg-green-50
                       focus:outline-none focus:ring-4 focus:ring-green-400 transition"
            required
            aria-required="true"
          />
        </div>

        {/* Duration Input */}
        <div>
          <label htmlFor="durationInput" className="block font-semibold mb-2 text-green-800">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="durationInput"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 15"
            className="w-full border border-green-300 px-4 py-2 rounded-lg bg-green-50
                       focus:outline-none focus:ring-4 focus:ring-green-400 transition"
            required
            aria-required="true"
          />
        </div>

        {/* Add Button */}
        <button
          type="submit"
          disabled={!time || !duration || Number(duration) <= 0}
          className={`w-full py-3 rounded-lg text-white font-semibold transition
            ${
              !time || !duration || Number(duration) <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500'
            } focus:outline-none`}
          aria-disabled={!time || !duration || Number(duration) <= 0}
        >
          Add Schedule
        </button>
      </form>

      {/* ARIA live region for announcements */}
      <div role="status" aria-live="polite" className="sr-only">
        {announce}
      </div>

      {/* Schedule List */}
      <div>
        <h3 className="font-semibold text-lg mb-4 text-green-700">🗓 Scheduled Watering Times</h3>
        {schedules.length === 0 ? (
          <p className="text-sm text-green-600">No schedules yet.</p>
        ) : (
          <ul className="space-y-3">
            {schedules.map((schedule, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-green-100 p-3 rounded-lg border border-green-200"
              >
                <span className="text-green-900 font-medium">
                  {schedule.day} at {schedule.time} — {schedule.duration} mins
                </span>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-600 hover:text-red-700 font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                  aria-label={`Remove schedule for ${schedule.day} at ${schedule.time}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
