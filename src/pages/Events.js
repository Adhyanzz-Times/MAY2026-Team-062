import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EventService } from '../services/event';
import PageHeader from '../components/PageHeader';
import EventCard from '../components/EventCard';

export default function Events() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await EventService.recommendEvents(user?.preferredSports || ['Badminton']);
        setEvents(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [user]);

  const handleRegisterEvent = async (eventId) => {
    try {
      await EventService.registerForEvent(eventId);
      // Re-fetch event state
      const updated = await EventService.recommendEvents(user?.preferredSports || ['Badminton']);
      setEvents(updated);
    } catch (err) {
      throw err; // throw back to card handler to show warning dialog
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Events & Tournaments" 
        description="Register for active coaching camps, local matches, and competitive tournaments."
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 premium-card bg-gray-50/50">
          <p className="text-sm text-gray-400 font-medium">No events currently scheduled.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onRegister={handleRegisterEvent} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
