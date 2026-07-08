import React, { useState } from 'react';
import { Calendar, Clock, Users, Star } from 'lucide-react';

export default function EventCard({ event, onRegister }) {
  const { id, title, date, time, sport, seatsAvailable, totalSeats, description, recommended } = event;
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await onRegister(id);
      setRegistered(true);
    } catch (err) {
      alert(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`premium-card p-5 hover-premium relative flex flex-col justify-between ${recommended ? 'border-purple-200 bg-gradient-to-br from-white to-purple-50/10' : ''}`}>
      {recommended && (
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-bold text-purple-800 shadow-sm border border-purple-250">
          <Star className="h-3 w-3 fill-purple-800" />
          <span>AI Recommended</span>
        </div>
      )}

      <div>
        <div className="mb-3">
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 uppercase tracking-wider mb-2 border border-purple-100">
            {sport}
          </span>
          <h4 className="text-lg font-bold text-gray-800 pr-24">{title}</h4>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="space-y-2 text-sm text-gray-500 mb-5">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span>{seatsAvailable} / {totalSeats} spots left</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="w-2/3">
          {seatsAvailable === 0 ? (
            <span className="text-xs text-red-500 font-medium">Registration full</span>
          ) : (
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-primary h-1.5 rounded-full" 
                style={{ width: `${((totalSeats - seatsAvailable) / totalSeats) * 100}%` }}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleRegister}
          disabled={seatsAvailable === 0 || registered || loading}
          className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all ${registered ? 'bg-green-50 text-green-700 border border-green-200 cursor-default' : seatsAvailable === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow'}`}
        >
          {loading ? 'Processing...' : registered ? 'Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
}
