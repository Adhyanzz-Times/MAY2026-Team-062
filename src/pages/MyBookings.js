import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookingService } from '../services/booking';
import PageHeader from '../components/PageHeader';
import BookingCard from '../components/BookingCard';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('Upcoming'); // 'Upcoming', 'Past', 'Cancelled'
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await BookingService.getBookings('member', user.id);
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await BookingService.cancelBooking(bookingId);
      // Reload bookings
      fetchBookings();
    } catch (err) {
      alert("Could not cancel booking: " + err.message);
    }
  };

  const getFilteredBookings = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    
    if (activeTab === 'Upcoming') {
      return bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
    } else if (activeTab === 'Past') {
      return bookings.filter(b => b.status === 'Completed' || (b.status === 'Confirmed' && b.date < todayStr));
    } else {
      return bookings.filter(b => b.status === 'Cancelled');
    }
  };

  const tabs = ['Upcoming', 'Past', 'Cancelled'];
  const filteredList = getFilteredBookings();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Bookings" 
        description="View and manage your upcoming, completed, and cancelled sport court reservations."
      />

      {/* Tabs navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-semibold border-b-2 transition-all ${activeTab === tab ? 'border-primary text-primary font-bold' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Bookings Card View */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : filteredList.length === 0 ? (
        <div className="text-center py-20 premium-card bg-gray-50/50">
          <p className="text-sm text-gray-400 font-medium">No {activeTab.toLowerCase()} bookings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onCancel={handleCancelBooking} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
