import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login1 from './pages/Login1';
import Signup12 from './pages/Signup12';
import Dashboard1 from './pages/Dashboard1';
import Questionnaire from './pages/Questionnaire';
import Unauthorized from './pages/Unauthorized';
import LoggedOut from './pages/LoggedOut';  // adjust path accordingly


// Import widget pages
import Waterusageoverview from './components/DashboardWidgets/Waterusageoverview';
import Waterinput from './components/DashboardWidgets/Waterinput';
import Usagequota from './components/DashboardWidgets/Usagequota';
import Alerts from './components/DashboardWidgets/Alerts';
import Optimizationtips from './components/DashboardWidgets/Optimizationtips';
import Leaderboard from './components/DashboardWidgets/Leaderboard';
import LocationComparision from './components/DashboardWidgets/LocationComparision';
import Watercycling from './components/DashboardWidgets/Watercycling';
import SmartgardernScheduler from './components/DashboardWidgets/SmartgardernScheduler';
import Communitywall from './components/DashboardWidgets/Communitywall';
import ProductSuggestions from './components/DashboardWidgets/Productsuggestions';

// Add other widgets here...

import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import ProtectedRoute
import AdminDashboard from './pages/AdminDashboard'; // ✅ Example admin dashboard component

// Fallback 404 page
function NotFound() {
  return <div className="p-6 text-center text-lg">404 - Page Not Found</div>;
}

// Wrapper component to provide required state props for Waterinput standalone route
function WaterinputWrapper() {
  const [waterUsedToday, setWaterUsedToday] = useState(0);

  return (
    <Waterinput
      waterUsedToday={waterUsedToday}
      setWaterUsedToday={setWaterUsedToday}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages */}
        <Route path="/" element={<Login1 />} />
        <Route path="/signup" element={<Signup12 />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/loggedout" element={<LoggedOut />} />

        {/* Main dashboard protected */}
        <Route
          path="/dashboard1"
          element={
            <ProtectedRoute>
              <Dashboard1 />
            </ProtectedRoute>
          }
        />

        {/* Admin dashboard protected */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized page */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Individual widget routes */}
        <Route path="/waterusageoverview" element={<Waterusageoverview />} />
        <Route path="/waterinput" element={<WaterinputWrapper />} />
        <Route path="/usagequota" element={<Usagequota />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/optimizationtips" element={<Optimizationtips />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/locationcomparision" element={<LocationComparision />} />
        <Route path="/watercycling" element={<Watercycling />} />
        <Route path="/smartgardernscheduler" element={<SmartgardernScheduler />} />
        <Route path="/communitywall" element={<Communitywall />} />
        <Route path="/productsuggestions" element={<ProductSuggestions />} />
        {/* Add more widgets here as needed */}

        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
