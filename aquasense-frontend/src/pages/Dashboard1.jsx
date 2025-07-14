
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import Waterinput from '../components/DashboardWidgets/Waterinput';
import Usagequota from '../components/DashboardWidgets/Usagequota';
import Alerts from '../components/DashboardWidgets/Alerts';
import Optimizationtips from '../components/DashboardWidgets/Optimizationtips';
import Leaderboard from '../components/DashboardWidgets/Leaderboard';
import LocationComparision from '../components/DashboardWidgets/LocationComparision';
import Watercycling from '../components/DashboardWidgets/Watercycling';
import SmartgardernScheduler from '../components/DashboardWidgets/SmartgardernScheduler';
import Communitywall from '../components/DashboardWidgets/Communitywall';
import ProductSuggestions from '../components/DashboardWidgets/Productsuggestions';

export default function Dashboard1() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [predictedUsage, setPredictedUsage] = useState(null);
  const [historicalPredictions, setHistoricalPredictions] = useState([]);
  const [localTodayUsage, setLocalTodayUsage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchDashboardData = async () => {
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     navigate('/login');
    //     return;
    //   }

    //   try {
    //     const response = await axios.get('http://localhost:5000/api/dashboard', {
    //       headers: { Authorization: token }
    //     });

    //     setDashboardData({
    //       usageToday: response.data.usageToday ?? [],
    //       dailyQuota: response.data.dailyQuota ?? 0,
    //       alerts: response.data.alerts ?? [],
    //       tips: response.data.tips ?? [],
    //       leaderboard: response.data.leaderboard ?? [],
    //     });

    //     const todayAmount = (response.data.usageToday ?? []).reduce((a, b) => a + b.amount, 0);
    //     setLocalTodayUsage(todayAmount);

    //     const prediction = localStorage.getItem('predictedUsage');
    //     if (prediction) setPredictedUsage(Number(prediction));

    //     const historyRes = await axios.get('http://localhost:5000/api/predictions', {
    //       headers: { Authorization: token }
    //     });
    //     setHistoricalPredictions(historyRes.data);

    //   } catch (error) {
    //     console.error(error);
    //     navigate('/login');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/'
    : process.env.REACT_APP_BACKEND_URL || 'https://aqua-ppr5.onrender.com/';

const fetchDashboardData = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  try {
    // Get dashboard data
    const response = await axios.get(`${BACKEND_URL}api/dashboard`, {
      headers: { Authorization: token }
    });

    setDashboardData({
      usageToday: response.data.usageToday ?? [],
      dailyQuota: response.data.dailyQuota ?? 0,
      alerts: response.data.alerts ?? [],
      tips: response.data.tips ?? [],
      leaderboard: response.data.leaderboard ?? [],
    });

    const todayAmount = (response.data.usageToday ?? []).reduce((a, b) => a + b.amount, 0);
    setLocalTodayUsage(todayAmount);

    const prediction = localStorage.getItem('predictedUsage');
    if (prediction) setPredictedUsage(Number(prediction));

    // Get historical predictions
    const historyRes = await axios.get(`${BACKEND_URL}api/predictions`, {
      headers: { Authorization: token }
    });

    setHistoricalPredictions(historyRes.data);

  } catch (error) {
    console.error(error);
    navigate('/login');
  } finally {
    setLoading(false);
  }
};


    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-800 text-lg">Loading...</div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="flex min-h-screen">
      {sidebarVisible && (
      <Sidebar
        isOpen={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        className="w-64 bg-indigo-700 text-white p-6 flex flex-col sticky top-0 h-screen"
      />
    )}

    {/* Show Button when Sidebar is hidden */}
    {!sidebarVisible && (
      <button
  onClick={() => setSidebarVisible(true)}
  className="fixed top-4 left-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
>
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z"/></svg>
</button>

    )}

      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header
  onMenuClick={() => setSidebarOpen(!sidebarOpen)}
  sidebarVisible={sidebarOpen}
/>

          

        <main className="p-6 flex-1 overflow-auto space-y-6">
          {predictedUsage && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Predicted Daily Water Usage</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[{ name: 'Prediction', usage: predictedUsage }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <p className="mt-4 text-center text-gray-700">
                Estimated usage: <span className="font-bold">{predictedUsage} Liters</span>
              </p>
            </div>
          )}

          {historicalPredictions.length > 0 && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-4">Prediction History</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalPredictions.map(p => ({
                  date: new Date(p.date).toLocaleDateString(),
                  usage: p.predictedUsage
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="usage" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <Waterinput onDailyTotalChange={setLocalTodayUsage} />
          <Usagequota waterUsedToday={localTodayUsage} dailyQuota={dashboardData.dailyQuota} />
          <Alerts waterUsedToday={localTodayUsage} dailyQuota={dashboardData.dailyQuota} />
          <Optimizationtips tips={dashboardData.tips} />
          <Leaderboard data={dashboardData.leaderboard} />
          <LocationComparision />

          <div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">
    <div className="bg-white p-4 rounded shadow h-full flex flex-col justify-between">
      <Watercycling dailyUsage={localTodayUsage} />
    </div>
  </div>
  <div className="w-full md:w-1/2">
    <div className="bg-white p-4 rounded shadow h-full flex flex-col justify-between">
      <SmartgardernScheduler />
    </div>
  </div>
</div>


          
          
          <Communitywall />
          <ProductSuggestions />

          <footer className="text-center text-sm text-gray-500 py-6">
            © 2025 AquaSense. All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
}
