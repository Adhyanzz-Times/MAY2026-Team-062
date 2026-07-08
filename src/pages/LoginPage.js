import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return setError('Please enter both email and password.');
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (role) => {
    setEmail(`${role}@sportsync.demo`);
    setPassword('password');
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-150 rounded-2xl shadow-xl p-8 mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back!</h3>
        <p className="text-sm text-gray-505 mt-1.5">Login to continue to SportSync</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2.5 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email or phone"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">Forgot Password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark shadow-md hover:shadow-lg transition-all text-sm mt-2"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      {/* Demo Credentials Quick Picker */}
      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Login (Demo)</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['member', 'coach', 'maintenance', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => handleQuickLogin(role)}
              className="text-[10px] font-bold border border-gray-250 bg-gray-50/50 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg transition-all capitalize"
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">Register</Link>
      </p>
    </div>
  );
}
