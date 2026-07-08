import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import { NotificationService } from '../services/notification';

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const notifs = await NotificationService.getNotifications();
        setUnreadCount(notifs.filter(n => !n.read).length);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNotifications();

    // Poll or re-check every few seconds to simulate real-time updates
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/book-court') return 'Book a Court';
    if (path === '/my-bookings') return 'My Bookings';
    if (path === '/membership') return 'Membership';
    if (path === '/events') return 'Events & Tournaments';
    if (path === '/complaints') return 'Complaints & Issues';
    if (path === '/notifications') return 'Notification Centre';
    if (path === '/profile') return 'My Profile';
    if (path === '/assistant') return 'AI Club Assistant';
    if (path === '/admin') return 'Admin Dashboard';
    if (path === '/admin/bookings') return 'Manage Bookings';
    if (path === '/admin/members') return 'Manage Members';
    if (path === '/admin/complaints') return 'Manage Complaints';
    if (path === '/admin/reports') return 'Reports & Analytics';
    return 'SportSync';
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-150 bg-white px-6 shadow-sm">
      {/* Left side: Hamburger (mobile) + Page Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{getPageTitle()}</h1>
      </div>

      {/* Right side: Notifications badge + Profile dropdown */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button 
          onClick={() => navigate('/notifications')}
          className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
