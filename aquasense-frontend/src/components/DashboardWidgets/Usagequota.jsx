import React from 'react';

export default function Usagequota({ waterUsedToday = 0, dailyQuota = 200 }) {
  const percentage =
    dailyQuota > 0
      ? Math.min((Number(waterUsedToday) / Number(dailyQuota)) * 100, 100)
      : 0;

  return (
    <section
      className="bg-gradient-to-br from-white via-violet-50 to-purple-100 p-6 rounded-2xl shadow-lg"
      role="region"
      aria-label="Daily water usage quota"
    >
      <h2 className="text-2xl font-bold text-purple-800 mb-3 tracking-wide">
        📊 % of Daily Quota Used
      </h2>

      <p
        className="text-4xl font-extrabold text-purple-700 mb-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {percentage.toFixed(1)}%
      </p>

      <p className="text-sm text-gray-700 mb-5 font-medium">
        Based on a daily quota of{' '}
        <span className="font-semibold text-purple-800">{dailyQuota}</span>{' '}
        liters
      </p>

      <div className="w-full bg-purple-200 rounded-full h-4" aria-hidden="true">
        <div
          className="bg-purple-600 h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </section>
  );
}
