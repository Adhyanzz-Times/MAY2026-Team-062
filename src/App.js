import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './router/ProtectedRoute';

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
            {/* Dynamic Dashboard Landing - any logged-in role */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

            {/* Member Screens */}
            <Route path="/book-court" element={<ProtectedRoute allowedRoles={['member']}><BookCourt /></ProtectedRoute>} />
            <Route path="/my-bookings" element={<ProtectedRoute allowedRoles={['member']}><MyBookings /></ProtectedRoute>} />
            <Route path="/membership" element={<ProtectedRoute allowedRoles={['member']}><Membership /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute allowedRoles={['member']}><Events /></ProtectedRoute>} />
            <Route path="/complaints" element={<ProtectedRoute allowedRoles={['member']}><Complaints /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/assistant" element={<ProtectedRoute allowedRoles={['member']}><AIAssistant /></ProtectedRoute>} />

            {/* Coach Screens */}
            <Route path="/coach/schedule" element={<ProtectedRoute allowedRoles={['coach']}><CoachSchedule /></ProtectedRoute>} />
            <Route path="/coach/attendance" element={<ProtectedRoute allowedRoles={['coach']}><CoachAttendance /></ProtectedRoute>} />

            {/* Maintenance Screens */}
            <Route path="/maintenance/complaints" element={<ProtectedRoute allowedRoles={['maintenance']}><MaintenanceComplaints /></ProtectedRoute>} />

            {/* Admin Screens */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookings /></ProtectedRoute>} />
            <Route path="/admin/members" element={<ProtectedRoute allowedRoles={['admin']}><AdminMembers /></ProtectedRoute>} />
            <Route path="/admin/complaints" element={<ProtectedRoute allowedRoles={['admin']}><AdminComplaints /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminReports /></ProtectedRoute>} />
          </Route>

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
