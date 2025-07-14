import React, { useState } from 'react';

const initialData = [
  { name: 'Arpita Soni', city: 'Ahmedabad', state: 'Gujarat', usage: 80 },
  { name: 'Asmita Soni', city: 'Bhubaneswar', state: 'Odisha', usage: 85 },
  { name: 'Oshan Khati', city: 'Mumbai', state: 'Maharashtra', usage: 90 },
  { name: 'Kshitiz Naik', city: 'Berhampur', state: 'Odisha', usage: 95 },
];

export default function Leaderboard() {
  const [users, setUsers] = useState(initialData);
  const [selectedState, setSelectedState] = useState('All');

  const [form, setForm] = useState({
    name: '',
    city: '',
    state: '',
    usage: '',
  });

  const uniqueStates = ['All', ...new Set(users.map((u) => u.state))];
  const filteredData = selectedState === 'All' ? users : users.filter((u) => u.state === selectedState);
  const sortedData = [...filteredData].sort((a, b) => a.usage - b.usage);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.state.trim() || !form.usage || isNaN(form.usage) || Number(form.usage) < 0) {
      alert('Please enter valid details');
      return;
    }

    setUsers((prev) => [
      ...prev,
      {
        name: form.name.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        usage: Number(form.usage),
      },
    ]);

    setForm({ name: '', city: '', state: '', usage: '' });
  };

  return (
    <div className="bg-gradient-to-br from-white via-indigo-50 to-blue-100 p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-indigo-700">🏆 Water Savers Club</h2>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Filter by state"
        >
          {uniqueStates.map((state, i) => (
            <option key={i} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            aria-label="Name"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            aria-label="City"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
            aria-label="State"
          />
          <input
            type="number"
            name="usage"
            placeholder="Usage (L/day)"
            value={form.usage}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            min="0"
            required
            aria-label="Daily water usage in liters"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          ➕ Add User
        </button>
      </form>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm" aria-label="Leaderboard Table">
          <thead>
            <tr className="border-b border-gray-300 bg-indigo-100 text-indigo-700">
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">City</th>
              <th className="py-2 px-3">Usage (L/day)</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user, index) => (
              <tr key={index} className="border-b hover:bg-indigo-50">
                <td className="py-2 px-3">{index + 1}</td>
                <td className="py-2 px-3 flex items-center gap-2">
                  {user.name}
                  {index === 0 && (
                    <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full font-medium">
                      🏅 Top Saver
                    </span>
                  )}
                </td>
                <td className="py-2 px-3">{user.city}</td>
                <td className="py-2 px-3">{user.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-3 italic">
        Rankings based on the lowest daily water usage per person.
      </p>
    </div>
  );
}
