import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  BookOpen, 
  CreditCard, 
  CalendarDays, 
  AlertCircle, 
  Bell, 
  User, 
  Bot, 
  LogOut, 
  X,
  FileText,
  Users,
  Dumbbell
} from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  const getLinks = () => {
    switch (user.role) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
          { name: 'Manage Bookings', path: '/admin/bookings', icon: BookOpen },
          { name: 'Manage Members', path: '/admin/members', icon: Users },
          { name: 'Manage Complaints', path: '/admin/complaints', icon: AlertCircle },
          { name: 'Reports', path: '/admin/reports', icon: FileText },
        ];
      case 'coach':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Practice Sessions', path: '/coach/schedule', icon: CalendarDays },
          { name: 'Attendance', path: '/coach/attendance', icon: Users },
          { name: 'Notifications', path: '/notifications', icon: Bell },
          { name: 'Profile', path: '/profile', icon: User },
        ];
      case 'maintenance':
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Assigned Complaints', path: '/maintenance/complaints', icon: AlertCircle },
          { name: 'Notifications', path: '/notifications', icon: Bell },
          { name: 'Profile', path: '/profile', icon: User },
        ];
      default:
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Book Court', path: '/book-court', icon: CalendarPlus },
          { name: 'My Bookings', path: '/my-bookings', icon: BookOpen },
          { name: 'Membership', path: '/membership', icon: CreditCard },
          { name: 'Events', path: '/events', icon: CalendarDays },
          { name: 'Practice Sessions', path: '/practice-sessions', icon: Dumbbell },
          { name: 'Complaints', path: '/complaints', icon: AlertCircle },
          { name: 'Notifications', path: '/notifications', icon: Bell },
          { name: 'Profile', path: '/profile', icon: User },
          { name: 'AI Assistant', path: '/assistant', icon: Bot },
        ];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-charcoal text-white transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Brand Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-charcoal-light">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
              S
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">SportSync</span>
          </div>
          <button onClick={toggleSidebar} className="rounded-lg p-1 text-gray-400 hover:bg-charcoal-light hover:text-white lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* User Quick Info */}
        <div className="flex items-center space-x-3 px-6 py-5 border-b border-charcoal-light">
          <img 
            src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
            alt={user.name} 
            className="h-10 w-10 rounded-full border-2 border-primary object-cover"
          />
          <div className="truncate">
            <h4 className="text-sm font-semibold truncate leading-none mb-1">{user.name}</h4>
            <span className="text-xs text-gray-400 capitalize">{user.role}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-all duration-150 ${isActive ? 'bg-primary text-white font-medium shadow-md shadow-primary/20' : 'text-gray-300 hover:bg-charcoal-light hover:text-white'}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-charcoal-light">
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-red-950/40 hover:text-red-400 transition-all duration-150"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
