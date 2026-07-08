import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AppLayout from './layouts/AppLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Member Pages
import BookCourt from './pages/BookCourt';
import MyBookings from './pages/MyBookings';
import Membership from './pages/Membership';
import Events from './pages/Events';
import Complaints from './pages/Complaints';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import AIAssistant from './pages/AIAssistant';

// Dynamic Dashboard Controller
import Dashboard from './pages/Dashboard';

// Coach Pages
import CoachSchedule from './pages/CoachSchedule';
import CoachAttendance from './pages/CoachAttendance';

// Maintenance Pages
import MaintenanceComplaints from './pages/MaintenanceComplaints';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './pages/AdminBookings';
import AdminMembers from './pages/AdminMembers';
import AdminComplaints from './pages/AdminComplaints';
import AdminReports from './pages/AdminReports';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Views */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Authenticated Views (Member + Admin Layout) */}
          <Route element={<AppLayout />}>
            {/* Dynamic Dashboard Landing */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Member Screens */}
            <Route path="/book-court" element={<BookCourt />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/events" element={<Events />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assistant" element={<AIAssistant />} />

            {/* Coach Screens */}
            <Route path="/coach/schedule" element={<CoachSchedule />} />
            <Route path="/coach/attendance" element={<CoachAttendance />} />

            {/* Maintenance Screens */}
            <Route path="/maintenance/complaints" element={<MaintenanceComplaints />} />

            {/* Admin Screens */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/members" element={<AdminMembers />} />
            <Route path="/admin/complaints" element={<AdminComplaints />} />
            <Route path="/admin/reports" element={<AdminReports />} />
          </Route>

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
