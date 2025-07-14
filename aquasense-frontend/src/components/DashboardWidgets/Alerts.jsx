import React from 'react';

export default function Alerts({ waterUsedToday = 120, dailyQuota = 150 }) {
  const usagePercentage = (waterUsedToday / dailyQuota) * 100;

  let bgColor = '';
  let borderColor = '';
  let textColor = '';
  let message = '';

  if (usagePercentage <= 60) {
    bgColor = 'bg-green-100';
    borderColor = 'border-green-400';
    textColor = 'text-green-700';
    message = "✅ You're within safe usage limits.";
  } else if (usagePercentage <= 90) {
    bgColor = 'bg-yellow-100';
    borderColor = 'border-yellow-400';
    textColor = 'text-yellow-700';
    message = '⚠️ Approaching your daily water limit.';
  } else {
    bgColor = 'bg-red-100';
    borderColor = 'border-red-400';
    textColor = 'text-red-700';
    message = "🚨 You've exceeded your daily water limit!";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-blue-100 p-6">
      <div
        role="alert"
        aria-live="assertive"
        className={`max-w-xl w-full text-center ${bgColor} ${borderColor} ${textColor} border-2 px-6 py-8 rounded-2xl shadow-lg transition-all duration-500`}
      >
        <h2 className="text-2xl font-bold mb-3">🚨 Water Usage Alert</h2>
        <p className="text-lg mb-4">{message}</p>
        <div className="text-sm text-gray-600">
          Used: <strong>{waterUsedToday}L</strong> / Quota: <strong>{dailyQuota}L</strong><br />
          ({usagePercentage.toFixed(1)}% used)
        </div>
      </div>
    </div>
  );
}
