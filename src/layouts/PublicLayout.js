import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Public Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-150 shadow-sm px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
            S
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">SportSync</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/#about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/#facilities" className="hover:text-primary transition-colors">Facilities</Link>
          <Link to="/#events" className="hover:text-primary transition-colors">Events</Link>
          <Link to="/#contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center space-x-3">
          {user ? (
            <Link 
              to={user.role === 'admin' ? '/admin' : '/dashboard'} 
              className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-all"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              {location.pathname !== '/login' && (
                <Link 
                  to="/login" 
                  className="text-xs font-semibold text-gray-700 hover:text-primary px-3 py-2 transition-colors"
                >
                  Login
                </Link>
              )}
              {location.pathname !== '/register' && (
                <Link 
                  to="/register" 
                  className="bg-primary text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary-dark transition-all shadow-sm"
                >
                  Register
                </Link>
              )}
            </>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow flex items-center justify-center py-10 px-4 md:px-0">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="bg-charcoal text-gray-400 py-8 px-6 text-center border-t border-charcoal-light text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-primary text-white flex items-center justify-center font-bold text-sm">S</div>
            <span className="text-white font-bold">SportSync</span>
          </div>
          <p>© {new Date().getFullYear()} SportSync IIT Madras Software Engineering Project. All rights reserved.</p>
          <div className="flex space-x-4">
            <span className="cursor-pointer hover:text-white">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
