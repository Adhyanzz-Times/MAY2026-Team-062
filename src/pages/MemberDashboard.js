import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookingService } from '../services/booking';
import { ComplaintService } from '../services/complaint';
import { EventService } from '../services/event';
import { AIService } from '../services/ai';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';
import { CalendarPlus, BookOpen, AlertCircle, CalendarDays, Award, ArrowRight, Sparkles } from 'lucide-react';

export default function MemberDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    bookingsCount: 0,
    membershipStatus: 'Active',
    eventsCount: 0,
    complaintsCount: 0
  });
  const [upcomingBooking, setUpcomingBooking] = useState(null);
  const [partners, setPartners] = useState([]);
  const announcements = [
    { id: 1, title: "Maintenance on Court 3", date: "23-May-2026", details: "Football Turf Court 3 leveling is planned for tomorrow morning." },
    { id: 2, title: "Summer Tournament 2026", date: "20-May-2026", details: "Registrations are filling fast. Check out the Events section." }
  ];

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) return;
      try {
        const bookings = await BookingService.getBookings('member', user.id);
        const complaints = await ComplaintService.getComplaints('member', user.id);
        const events = await EventService.getEvents();

        const activeBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
        const activeComplaints = complaints.filter(c => c.status === 'Open' || c.status === 'In Progress');

        setStats({
          bookingsCount: activeBookings.length,
          membershipStatus: user.membershipType || 'Premium',
          eventsCount: events.length,
          complaintsCount: activeComplaints.length
        });

        // Get first upcoming booking
        const sortedUpcoming = bookings
          .filter(b => b.status === 'Confirmed')
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (sortedUpcoming.length > 0) {
          setUpcomingBooking(sortedUpcoming[0]);
        }

        const partnerRecs = await AIService.recommendPracticePartner();
        setPartners(partnerRecs);
      } catch (err) {
        console.error(err);
      }
    }
    loadDashboardData();
  }, [user]);

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Welcome, ${user?.name || 'Member'} 👋`} 
        description="Here's what's happening at your club today."
      >
        <button 
          onClick={() => navigate('/book-court')}
          className="bg-primary text-white font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-primary-dark shadow-sm hover:shadow transition-all flex items-center space-x-1.5"
        >
          <CalendarPlus className="h-4 w-4" />
          <span>Book a Court</span>
        </button>
      </PageHeader>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard 
          title="Upcoming Bookings" 
          value={stats.bookingsCount} 
          icon={BookOpen} 
          trend="up" 
        />
        <StatsCard 
          title="Membership" 
          value={stats.membershipStatus} 
          icon={Award} 
          trend="up" 
        />
        <StatsCard 
          title="Events Registered" 
          value={1} // Static mock count for demo registration
          icon={CalendarDays} 
          trend="up" 
        />
        <StatsCard 
          title="Open Complaints" 
          value={stats.complaintsCount} 
          icon={AlertCircle} 
          trend="down" 
        />
      </div>

      {/* Main body split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Upcoming Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
              <h4 className="font-bold text-gray-800 text-base">Upcoming Booking</h4>
              <Link to="/my-bookings" className="text-xs font-semibold text-primary hover:underline flex items-center">
                <span>View All</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            {upcomingBooking ? (
              <div className="bg-purple-50/30 border border-purple-100/60 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-white uppercase tracking-wider mb-2">
                    {upcomingBooking.sport}
                  </span>
                  <h5 className="font-bold text-lg text-gray-800">{upcomingBooking.courtName}</h5>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(upcomingBooking.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} | {upcomingBooking.startTime} - {upcomingBooking.endTime}
                  </p>
                </div>
                <span className="mt-4 md:mt-0 text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-semibold shadow-sm">
                  Confirmed
                </span>
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-50/50 rounded-xl border border-dashed border-gray-250">
                <p className="text-sm text-gray-400 font-medium">No bookings scheduled.</p>
                <button 
                  onClick={() => navigate('/book-court')}
                  className="mt-3 text-xs font-bold text-primary hover:underline"
                >
                  Book your first court now
                </button>
              </div>
            )}
          </div>

          {/* AI Recommended Widget */}
          <div className="bg-gradient-to-r from-primary to-purple-800 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
            {/* Visual background element */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 skew-x-12 translate-x-10 pointer-events-none" />

            <h4 className="text-lg font-bold mb-2">Smart Booking Slot Recommendation</h4>
            <p className="text-xs text-purple-150 max-w-xl leading-relaxed mb-5">
              Based on your play pattern, your preferred court **Badminton Court 2** is available tomorrow at **06:00 PM**. Weather matches your play history perfectly.
            </p>
            <button
              onClick={() => navigate('/book-court', { state: { recommend: true } })}
              className="bg-white text-primary text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors shadow"
            >
              Book Recommended Slot
            </button>
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="space-y-6">
          {/* Announcements list */}
          <div className="premium-card p-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
              <h4 className="font-bold text-gray-800 text-base">Announcements</h4>
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-semibold">Active</span>
            </div>

            <div className="space-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-4 bg-gray-50/50 rounded-lg border border-gray-100/80 hover:border-gray-200 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <h5 className="font-semibold text-sm text-gray-800">{ann.title}</h5>
                    <span className="text-[10px] text-gray-400">{ann.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{ann.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Practice Partners Widget */}
          <div className="premium-card p-6 border border-purple-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-150 mb-5">
              <h4 className="font-bold text-gray-800 text-base flex items-center">
                <Sparkles className="h-4 w-4 mr-1.5 text-primary fill-purple-200" />
                AI Practice Partners
              </h4>
              <span className="text-[10px] bg-purple-50 text-purple-750 px-2 py-0.5 rounded font-bold border border-purple-150">Suggested</span>
            </div>

            <div className="space-y-3">
              {partners.map((partner) => (
                <div key={partner.id} className="p-3 bg-gray-50/50 rounded-lg border border-gray-150 flex items-center justify-between text-xs hover:border-purple-200 transition-all">
                  <div>
                    <h5 className="font-bold text-gray-800">{partner.name}</h5>
                    <p className="text-[10px] text-gray-505 mt-0.5">{partner.sport} • {partner.level}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Prefers: {partner.preferredTimes}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-purple-50 text-purple-700 text-[10px] px-2 py-0.5 rounded border border-purple-150 font-bold">{partner.matchScore} match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
