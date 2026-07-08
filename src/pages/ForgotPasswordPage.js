import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth';
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return setError('Please enter your email address.');
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await AuthService.resetPassword(email);
      setSuccess(res.message);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-150 rounded-2xl shadow-xl p-8 mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Reset Password</h3>
        <p className="text-sm text-gray-500 mt-1.5 font-medium">Enter your email and we'll send you a link to reset your password</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2.5 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-2.5 rounded-lg">
          {success}
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
              placeholder="Enter your email"
              className="pl-9 pr-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark shadow-md hover:shadow-lg transition-all text-sm mt-2"
        >
          {loading ? 'Sending link...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="text-center mt-6">
        <Link to="/login" className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-500 hover:text-primary transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Login</span>
        </Link>
      </div>
    </div>
  );
}
