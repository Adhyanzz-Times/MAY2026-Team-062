import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookingService } from '../services/booking';
import PageHeader from '../components/PageHeader';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export default function BookCourt() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const sportsList = ["Badminton", "Football Turf", "Tennis", "Basketball", "Table Tennis", "Cricket Net"];

  const [selectedSport, setSelectedSport] = useState('Badminton');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const [courts, setCourts] = useState([]);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState(null);

  // Load courts when sport changes
  useEffect(() => {
    async function loadCourts() {
      const filteredCourts = await BookingService.getCourtsBySport(selectedSport);
      setCourts(filteredCourts);
      if (filteredCourts.length > 0) {
        setSelectedCourt(filteredCourts[0]);
      }
    }
    loadCourts();
  }, [selectedSport]);

  // Load slots when court or date changes
  useEffect(() => {
    async function loadSlots() {
      if (selectedCourt) {
        const availableSlots = await BookingService.getAvailableSlots(selectedCourt.id, selectedDate);
        setSlots(availableSlots);
        setSelectedSlot(null); // Reset selection
      }
    }
    loadSlots();
  }, [selectedCourt, selectedDate]);

  // Auto trigger AI recommendation if navigated from Dashboard recommended button
  useEffect(() => {
    if (location.state && location.state.recommend) {
      handleGetAIRecommendation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');

  const handleNaturalLanguageParse = () => {
    if (!naturalLanguageInput.trim()) return;
    const query = naturalLanguageInput.toLowerCase();
    
    let sportMatch = 'Badminton';
    if (query.includes('football') || query.includes('turf')) {
      sportMatch = 'Football Turf';
    } else if (query.includes('tennis')) {
      sportMatch = 'Tennis';
    } else if (query.includes('basketball')) {
      sportMatch = 'Basketball';
    } else if (query.includes('table tennis') || query.includes('ping pong')) {
      sportMatch = 'Table Tennis';
    } else if (query.includes('cricket')) {
      sportMatch = 'Cricket Net';
    }
    
    setSelectedSport(sportMatch);
    
    let dateMatch = new Date().toISOString().split('T')[0];
    if (query.includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateMatch = tomorrow.toISOString().split('T')[0];
    } else if (query.includes('day after')) {
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      dateMatch = dayAfter.toISOString().split('T')[0];
    }
    setSelectedDate(dateMatch);

    setTimeout(async () => {
      const courtsList = await BookingService.getCourtsBySport(sportMatch);
      if (courtsList.length > 0) {
        const selected = courtsList[0];
        setSelectedCourt(selected);
        
        let slotMatch = "06:00 PM";
        if (query.includes('morning')) {
          slotMatch = "08:00 AM";
        } else if (query.includes('afternoon')) {
          slotMatch = "02:00 PM";
        } else if (query.includes('evening') || query.includes('night')) {
          slotMatch = "06:00 PM";
        }
        
        setSelectedSlot(slotMatch);
        
        setAiRecommendation({
          courtId: selected.id,
          courtName: selected.name,
          sport: sportMatch,
          date: dateMatch,
          startTime: slotMatch,
          reason: `Successfully parsed: "${naturalLanguageInput}". AI matched ${sportMatch} on ${dateMatch} at ${slotMatch}.`
        });
      }
    }, 100);
  };

  const handleGetAIRecommendation = async () => {
    setLoading(true);
    try {
      const rec = await BookingService.recommendSlot(selectedSport, selectedDate);
      if (rec) {
        setAiRecommendation(rec);
        // Autoselect
        const recCourt = courts.find(c => c.id === rec.courtId);
        if (recCourt) setSelectedCourt(recCourt);
        setSelectedSlot(rec.startTime);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedCourt || !selectedSlot) return;
    setLoading(true);
    try {
      await BookingService.bookCourt({
        memberId: user.id,
        memberName: user.name,
        courtId: selectedCourt.id,
        courtName: selectedCourt.name,
        sport: selectedSport,
        date: selectedDate,
        startTime: selectedSlot,
        endTime: calculateEndTime(selectedSlot)
      });
      navigate('/my-bookings');
    } catch (err) {
      alert("Failed to book court");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const calculateEndTime = (startTime) => {
    // Basic slot math: adds 1 hour
    const [time, modifier] = startTime.split(' ');
    let [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    if (h === 12) h = 0;
    h = h + 1;
    if (h === 12) {
      return `12:${minutes} ${modifier === 'PM' ? 'AM' : 'PM'}`;
    }
    return `${h.toString().padStart(2, '0')}:${minutes} ${modifier}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Book a Court" 
        description="Select a sport facility, date and available slot to register a booking."
      >
        <button
          onClick={handleGetAIRecommendation}
          disabled={loading}
          className="bg-purple-100 text-purple-800 border border-purple-200 font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-purple-200 transition-all flex items-center space-x-1.5 shadow-sm"
        >
          <Sparkles className="h-4 w-4 fill-purple-800 text-purple-800" />
          <span>{loading ? 'Analyzing...' : 'Recommend Best Slot'}</span>
        </button>
      </PageHeader>

      {/* AI Recommendation notification banner */}
      {aiRecommendation && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-purple-950 shadow-sm animate-fade-in">
          <Sparkles className="h-5 w-5 text-purple-700 fill-purple-100 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-purple-900 text-sm">AI Suggested Slot Selected!</span>
            <p className="mt-1 leading-relaxed text-purple-800 font-medium">
              We selected {aiRecommendation.courtName} on {new Date(aiRecommendation.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} at {aiRecommendation.startTime}. <br />
              <span className="text-[11px] text-gray-500 font-normal italic">{aiRecommendation.reason}</span>
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: selectors on left, preview on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selectors Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Natural Language Booking Input */}
          <div className="premium-card p-6 border border-purple-200 bg-gradient-to-br from-white to-purple-50/5">
            <h4 className="font-bold text-gray-800 text-sm mb-2 flex items-center">
              <Sparkles className="h-4 w-4 text-primary mr-1.5" />
              AI Natural Language Booking
            </h4>
            <p className="text-[11px] text-gray-505 mb-4">
              Type your request naturally (e.g. "Book badminton tomorrow evening" or "football turf morning") and let AI select the choices.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={naturalLanguageInput}
                onChange={(e) => setNaturalLanguageInput(e.target.value)}
                placeholder="e.g., Book badminton tomorrow evening"
                className="flex-1 px-3 py-2 text-xs border border-gray-250 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-white shadow-sm font-medium"
              />
              <button
                type="button"
                onClick={handleNaturalLanguageParse}
                className="bg-primary hover:bg-primary-dark text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors flex-shrink-0 shadow-sm"
              >
                AI Parse
              </button>
            </div>
          </div>

          {/* Step 1: Sport selector */}
          <div className="premium-card p-6">
            <h4 className="font-bold text-gray-800 text-sm mb-4">1. Select Sport</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {sportsList.map((sport) => (
                <button
                  key={sport}
                  onClick={() => {
                    setSelectedSport(sport);
                    setAiRecommendation(null);
                  }}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${selectedSport === sport ? 'border-primary bg-primary-soft text-primary shadow-sm' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 & 3: Court & Date Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Court Picker */}
            <div className="premium-card p-6">
              <h4 className="font-bold text-gray-800 text-sm mb-4">2. Select Court</h4>
              <div className="space-y-2">
                {courts.map((court) => (
                  <button
                    key={court.id}
                    onClick={() => {
                      setSelectedCourt(court);
                      setAiRecommendation(null);
                    }}
                    disabled={court.status === 'Maintenance'}
                    className={`w-full flex justify-between items-center p-3 rounded-xl border text-left text-xs font-semibold transition-all ${selectedCourt?.id === court.id ? 'border-primary bg-primary-soft text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-350 hover:bg-gray-50'} ${court.status === 'Maintenance' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span>{court.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${court.status === 'Available' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {court.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Picker */}
            <div className="premium-card p-6">
              <h4 className="font-bold text-gray-800 text-sm mb-4">3. Select Date</h4>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setAiRecommendation(null);
                  }}
                  className="pl-9 pr-4 py-2.5 w-full text-xs font-semibold border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                />
              </div>
              {/* Decorative mini calendar text info */}
              <p className="text-[11px] text-gray-400 mt-4 leading-relaxed">
                Premium members can book slots up to 7 days in advance.
              </p>
            </div>
          </div>

          {/* Step 4: Slot Picker */}
          <div className="premium-card p-6">
            <h4 className="font-bold text-gray-800 text-sm mb-4">4. Select Time Slot</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`py-3 px-2.5 rounded-xl border text-xs font-bold transition-all relative flex flex-col items-center justify-center ${selectedSlot === slot.time ? 'border-primary bg-primary-soft text-primary shadow-sm' : !slot.available ? 'border-gray-150 bg-gray-50 text-gray-400 cursor-not-allowed' : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'} ${slot.aiRecommended ? 'ring-2 ring-purple-500/20 border-purple-400' : ''}`}
                >
                  <span>{slot.time}</span>
                  {slot.aiRecommended && (
                    <span className="absolute -top-1.5 right-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-purple-500 text-[8px] text-white font-bold animate-pulse">
                      ★
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Preview Column */}
        <div className="h-fit">
          <div className="premium-card p-6 bg-gray-50/50 border border-gray-100">
            <h4 className="font-bold text-gray-800 text-sm pb-3 border-b border-gray-200/80 mb-4">Booking Summary</h4>
            
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center text-gray-500">
                <span>Facility Sport:</span>
                <span className="font-bold text-gray-800">{selectedSport}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Court Assigned:</span>
                <span className="font-bold text-gray-800">{selectedCourt?.name || 'Not selected'}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Date:</span>
                <span className="font-bold text-gray-800">{new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500">
                <span>Time Slot:</span>
                <span className="font-bold text-gray-800">{selectedSlot ? `${selectedSlot} - ${calculateEndTime(selectedSlot)}` : 'Not selected'}</span>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-gray-500">
                <span>Booking Fee:</span>
                <span className="font-bold text-green-700">Free (Premium)</span>
              </div>
            </div>

            <button
              onClick={() => setShowConfirm(true)}
              disabled={!selectedCourt || !selectedSlot || loading}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
            >
              Continue to Book
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 animate-scale-up">
            <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2" /> Confirm Court Booking
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              You are about to book {selectedCourt?.name} on {selectedDate} at {selectedSlot}.
            </p>
            <div className="flex justify-end space-x-3 text-xs">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold shadow"
              >
                {loading ? 'Confirming...' : 'Yes, Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
