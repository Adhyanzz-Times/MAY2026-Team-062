import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

export default function BookingCard({ booking, onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { id, courtName, sport, date, startTime, endTime, status } = booking;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-50 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-150';
      case 'Completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const handleCancelClick = () => {
    setShowConfirm(true);
  };

  const confirmCancel = () => {
    onCancel(id);
    setShowConfirm(false);
  };

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const isCancelable = status === 'Confirmed' || status === 'Pending';

  return (
    <div className="premium-card p-5 hover-premium relative overflow-hidden">
      {/* Top section with sport and status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-primary-soft text-primary uppercase tracking-wider mb-2">
            {sport}
          </span>
          <h4 className="text-lg font-bold text-gray-800">{courtName}</h4>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      {/* Date & Time fields */}
      <div className="space-y-2 text-sm text-gray-600 mb-5">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{startTime} - {endTime}</span>
        </div>
      </div>

      {/* Action panel */}
      {isCancelable && (
        <div className="flex justify-end pt-3 border-t border-gray-100">
          {!showConfirm ? (
            <button
              onClick={handleCancelClick}
              className="text-xs font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-100"
            >
              Cancel Booking
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-xs text-red-600 font-medium flex items-center">
                <AlertTriangle className="h-3.5 w-3.5 mr-1" /> Are you sure?
              </span>
              <button 
                onClick={confirmCancel} 
                className="bg-red-600 text-white text-[11px] px-2.5 py-1 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button 
                onClick={() => setShowConfirm(false)} 
                className="bg-gray-100 text-gray-700 text-[11px] px-2.5 py-1 rounded hover:bg-gray-200"
              >
                No
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
