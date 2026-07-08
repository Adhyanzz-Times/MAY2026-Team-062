import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Settings, LogOut } from 'lucide-react';

export default function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate('/profile');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
      >
        <img 
          src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"} 
          alt={user.name} 
          className="h-8 w-8 rounded-full border border-gray-200 object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50 border border-gray-100">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          
          <button
            onClick={handleProfileClick}
            className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </button>
          
          <button
            onClick={() => {
              setIsOpen(false);
              navigate(user.role === 'admin' ? '/admin' : '/dashboard');
            }}
            className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>Dashboard</span>
          </button>

          <hr className="my-1 border-gray-100" />
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
