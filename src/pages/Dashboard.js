import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MemberDashboard from './MemberDashboard';
import CoachDashboard from './CoachDashboard';
import MaintenanceDashboard from './MaintenanceDashboard';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'coach':
      return <CoachDashboard />;
    case 'maintenance':
      return <MaintenanceDashboard />;
    default:
      return <MemberDashboard />;
  }
}
