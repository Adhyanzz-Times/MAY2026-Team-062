import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';
import { CoachService } from '../services/coach';
import { CalendarDays, Users, Clock, Award } from 'lucide-react';

export default function CoachDashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    CoachService.getSessions()
      .then((data) => {
        if (isMounted) setSessions(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const totalTrainees = sessions.reduce((sum, s) => sum + s.trainees, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coach Workspace"
        description="Oversee your student trainee cohorts, active coaching slots, and tournament drill schedules."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="Scheduled Sessions" value={String(sessions.length)} icon={CalendarDays} />
        <StatsCard title="Trainees Registered" value={String(totalTrainees)} icon={Users} />
        <StatsCard title="Total Coached Hours" value="120" icon={Clock} unit="Hrs" />
        <StatsCard title="Performance Score" value="98%" icon={Award} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 premium-card p-6">
          <h4 className="font-bold text-gray-800 text-sm pb-3 border-b border-gray-150 mb-4">Today's Practice Sessions</h4>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div key={session.id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-150 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <h5 className="font-bold text-gray-800 text-sm">{session.title}</h5>
                    <p className="text-xs text-gray-500 mt-1">{session.court} • {session.time}</p>
                  </div>
                  <span className="bg-primary-soft text-primary text-[10px] px-2.5 py-1 rounded-lg font-bold border border-primary/10">
                    {session.trainees} Trainees
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="premium-card p-6 h-full flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-gray-800 text-sm pb-3 border-b border-gray-150 mb-4">AI Practice Tips</h4>
            <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-purple-950 leading-relaxed">
              Based on court utilization index, the best time to organize outdoor Tennis drills is <strong>weekdays 4 PM - 5 PM</strong> to avoid the peak badminton rush.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
