import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const cityAverages = {
  Mumbai: 135, Delhi: 140, Bengaluru: 130, Hyderabad: 125, Ahmedabad: 120,
  Chennai: 128, Kolkata: 132, Pune: 115, Jaipur: 110, Lucknow: 108,
  Kanpur: 105, Nagpur: 112, Indore: 109, Bhopal: 107, Patna: 103,
  Vadodara: 106, Ludhiana: 102, Agra: 100, Nashik: 98, Faridabad: 101,
  Meerut: 99, Rajkot: 97, Srinagar: 92, Amritsar: 94, Ranchi: 93,
  Bhubaneswar: 120, Cuttack: 100, Puri: 110, Rourkela: 130, Sambalpur: 95,
  Berhampur: 105, Balasore: 115, Baripada: 90, Koraput: 85, Angul: 98,
  Jharsuguda: 125, Dhenkanal: 102, Rayagada: 92, Kendujhar: 88,
};

const COLORS = ['#60A5FA', '#A78BFA']; // Tailwind blue-400, purple-400

export default function LocationComparison() {
  const [city, setCity] = useState('Bhubaneswar');
  const [userUsage, setUserUsage] = useState(105);
  const [average, setAverage] = useState(cityAverages[city]);

  useEffect(() => {
    setAverage(cityAverages[city]);
  }, [city]);

  const diff = userUsage - average;
  const status =
    diff > 0
      ? { message: 'above', color: 'text-red-600' }
      : diff < 0
      ? { message: 'below', color: 'text-green-600' }
      : { message: 'equal to', color: 'text-yellow-600' };

  const data = [
    { name: 'Your Usage', value: userUsage },
    { name: 'City Average', value: average },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 rounded-2xl shadow-md" role="region" aria-label="Location Water Usage Comparison">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 tracking-wide">
        📍 Location Comparison
      </h2>

      {/* City Dropdown */}
      <div className="mb-4">
        <label htmlFor="citySelect" className="block font-medium text-gray-800 mb-1">
          Select your city:
        </label>
        <select
          id="citySelect"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {Object.keys(cityAverages).map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </div>

      {/* User Usage Input */}
      <div className="mb-4">
        <label htmlFor="userUsageInput" className="block font-medium text-gray-800 mb-1">
          Enter your daily water usage (liters):
        </label>
        <input
          type="number"
          id="userUsageInput"
          value={userUsage}
          onChange={(e) => setUserUsage(Number(e.target.value))}
          className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          min={0}
        />
      </div>

      {/* Data Comparison */}
      <div className="text-base text-gray-700 mt-2 leading-relaxed">
        <p>
          Average in <strong className="text-indigo-600">{city}</strong>: <span className="font-medium">{average} L</span>
        </p>
        <p>
          Your usage: <span className="text-indigo-600 font-medium">{userUsage} L</span>
        </p>
        <p className={`mt-2 font-semibold ${status.color}`}>
          You are {Math.abs(diff)} L {status.message} your city's average.
        </p>
      </div>

      {/* Pie Chart */}
      <div className="mt-6 h-72" role="img" aria-label="Pie chart comparing your usage with city average">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
