import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, User, Mail, Phone, Lock } from 'lucide-react';

export default function RegisterPage() {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      return setError('Please fill in all the details.');
    }
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Create user session mock
      const newUser = {
        id: `M00${Math.floor(100 + Math.random() * 900)}`,
        name,
        email,
        phone,
        role: 'member',
        membershipType: 'Standard',
        joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        expiryDate: 'Not Active',
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-150 rounded-2xl shadow-xl p-8 mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Create Your Account</h3>
        <p className="text-sm text-gray-500 mt-1.5">Join our sports community today</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2.5 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-2.5 rounded-lg">
          Registration successful! Redirecting...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create password"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark shadow-md hover:shadow-lg transition-all text-sm mt-3"
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <p className="text-center text-xs text-gray-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">Login</Link>
      </p>
    </div>
  );
}
