import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CoachService } from '../services/coach';
import PageHeader from '../components/PageHeader';
import { Calendar, Clock, MapPin, CheckCircle2, AlertCircle, Dumbbell, XCircle } from 'lucide-react';

export default function PracticeSessions() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [memberRegistrations, setMemberRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [notification, setNotification] = useState(null);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [sessionsData, regsData] = await Promise.all([
        CoachService.getSessions(),
        CoachService.getMemberRegistrations(user.id)
      ]);
      setSessions(sessionsData.filter(s => s.status !== 'Cancelled'));
      setMemberRegistrations(regsData);
    } catch (err) {
      console.error("Error loading practice sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleRegister = async (sessionId) => {
    if (!user) return;
    setActionLoadingId(sessionId);
    try {
      await CoachService.registerForSession(sessionId, user.id, user.name);
      showNotification("Successfully registered for practice session!");
      await loadData();
    } catch (err) {
      showNotification(err.message || "Registration failed", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCancelRegistration = async (sessionId) => {
    if (!user) return;
    setActionLoadingId(sessionId);
    try {
      await CoachService.cancelRegistration(sessionId, user.id);
      showNotification("Registration cancelled successfully.");
      await loadData();
    } catch (err) {
      showNotification(err.message || "Failed to cancel registration", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Practice Sessions" 
        description="View upcoming coach-led practice sessions and manage your session registrations."
      />

      {notification && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-fade-in ${notification.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'}`}>
          <div className="flex items-center space-x-2">
            {notification.type === 'error' ? (
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-20 premium-card bg-gray-50/50">
          <Dumbbell className="h-10 w-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400 font-medium">No practice sessions currently scheduled.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session) => {
            const isRegistered = memberRegistrations.some(r => r.sessionId === session.id);
            const isActioning = actionLoadingId === session.id;

            return (
              <div key={session.id} className="premium-card p-5 hover-premium flex flex-col justify-between border-gray-150">
                <div>
                  <div className="mb-3 flex justify-between items-start">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 uppercase tracking-wider border border-purple-100">
                      {session.sport}
                    </span>
                    {isRegistered && (
                      <span className="inline-flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Registered</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-gray-800 mb-1">{session.title}</h4>
                  
                  {session.description && (
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2">{session.description}</p>
                  )}

                  <div className="space-y-2 text-xs text-gray-500 mb-5">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(session.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{session.time || `${session.startTime} - ${session.endTime}`}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{session.court}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                  {isRegistered ? (
                    <button
                      onClick={() => handleCancelRegistration(session.id)}
                      disabled={isActioning}
                      className="text-xs font-semibold px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all flex items-center space-x-1 disabled:opacity-50"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      <span>{isActioning ? 'Cancelling...' : 'Cancel Registration'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRegister(session.id)}
                      disabled={isActioning}
                      className="text-xs font-semibold px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow transition-all disabled:opacity-50"
                    >
                      {isActioning ? 'Registering...' : 'Register Session'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
