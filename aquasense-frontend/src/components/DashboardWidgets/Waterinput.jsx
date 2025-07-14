import React, { useState, useEffect } from 'react';

export default function Waterinput({ onDailyTotalChange }) {
  const getTodayKey = () => new Date().toISOString().slice(0, 10);
  const todayKey = getTodayKey();

  const [inputValue, setInputValue] = useState('');
  const [dailyTotal, setDailyTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(`waterUsed_${todayKey}`);
    const initial = stored ? Number(stored) : 0;
    setDailyTotal(initial);
    onDailyTotalChange?.(initial);
  }, [todayKey, onDailyTotalChange]);

  const validateInput = (value) => {
    if (value === '') {
      setError('');
      return false;
    }
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      setError('Please enter a positive number');
      return false;
    }
    if (num > 10000) {
      setError('Value too large');
      return false;
    }
    setError('');
    return true;
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    validateInput(val);
  };

  const handleAddWater = () => {
    if (!validateInput(inputValue)) return;

    const value = Number(inputValue);
    const newTotal = dailyTotal + value;

    setDailyTotal(newTotal);
    localStorage.setItem(`waterUsed_${todayKey}`, newTotal.toString());
    setInputValue('');
    setError('');
    onDailyTotalChange?.(newTotal);
  };

  return (
    <section
      className="bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg"
      role="region"
      aria-label="Water Used Today Input"
    >
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 tracking-wide">
        🚰 Water Used Today
      </h2>

      <label htmlFor="waterUsedInput" className="sr-only">
        Enter water used today in liters
      </label>

      <input
        id="waterUsedInput"
        type="number"
        min="0"
        step="0.1"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter amount in liters"
        className={`w-full border rounded-xl px-4 py-3 font-medium text-gray-800 bg-white placeholder-gray-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddWater();
          }
        }}
        aria-describedby="waterUsedHelp waterInputError"
        aria-invalid={error ? 'true' : 'false'}
      />

      {error && (
        <p
          id="waterInputError"
          className="mt-2 text-sm text-red-600 font-semibold"
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        onClick={handleAddWater}
        disabled={!inputValue || !!error}
        className={`mt-4 w-full py-3 rounded-xl font-semibold text-white transition duration-200 ${
          !inputValue || error
            ? 'bg-indigo-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        ➕ Add Water Usage
      </button>

      <p className="mt-6 text-md text-gray-700 font-medium">
        Total used today:{' '}
        <span className="text-indigo-700 font-bold">
          {dailyTotal.toFixed(2)} Liters
        </span>
      </p>

      <p
        id="waterUsedHelp"
        className="mt-1 text-sm text-gray-500 italic tracking-wide"
      >
        This resets daily and is stored locally in your browser.
      </p>
    </section>
  );
}
