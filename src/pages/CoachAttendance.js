import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { CoachService } from '../services/coach';

export default function CoachAttendance() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regsLoading, setRegsLoading] = useState(false);

  useEffect(() => {
    async function loadSessions() {
      setLoading(true);
      try {
        const data = await CoachService.getSessions();
        const activeOnly = data.filter(s => s.status !== 'Cancelled');
        setSessions(activeOnly);
        if (activeOnly.length > 0) {
          setSelectedSessionId(activeOnly[0].id);
        }
      } catch (err) {
        console.error("Failed to load sessions for attendance:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSessions();
  }, []);

  useEffect(() => {
    async function loadRegistrations() {
      if (!selectedSessionId) {
        setRegistrations([]);
        return;
      }
      setRegsLoading(true);
      try {
        const data = await CoachService.getRegistrations(selectedSessionId);
        setRegistrations(data);
      } catch (err) {
        console.error("Failed to load session registrations:", err);
      } finally {
        setRegsLoading(false);
      }
    }
    loadRegistrations();
  }, [selectedSessionId]);

  const updateStatus = async (registrationId, newStatus) => {
    try {
      await CoachService.updateAttendanceStatus(registrationId, newStatus);
      setRegistrations(prev => prev.map(r => {
        if (r.id === registrationId) {
          return { ...r, status: newStatus };
        }
        return r;
      }));
    } catch (err) {
      console.error("Failed to update attendance status:", err);
    }
  };

  const selectedSession = sessions.find(s => s.id === selectedSessionId);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Absent':
        return 'bg-red-50 text-red-650 border-red-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const columns = [
    { header: 'Registration ID', accessor: 'id' },
    { header: 'Member ID', accessor: 'memberId' },
    { header: 'Member Name', accessor: 'memberName' },
    { 
      header: 'Session', 
      render: () => selectedSession ? `${selectedSession.title} (${selectedSession.sport})` : ''
    },
    { 
      header: 'Attendance Status', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${getStatusBadgeClass(row.status)}`}>
          {row.status || 'Not Marked'}
        </span>
      ) 
    },
    {
      header: 'Action',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => updateStatus(row.id, 'Present')}
            className={`text-xs px-2.5 py-1 rounded font-semibold border transition-all ${row.status === 'Present' ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-green-50 hover:text-green-700'}`}
          >
            Present
          </button>
          <button
            onClick={() => updateStatus(row.id, 'Absent')}
            className={`text-xs px-2.5 py-1 rounded font-semibold border transition-all ${row.status === 'Absent' ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-red-50 hover:text-red-700'}`}
          >
            Absent
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance Roster" 
        description="Mark and review the daily attendance log of members registered for your practice sessions."
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Practice Session Selector */}
          <div className="premium-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Select Practice Session:
            </label>
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="text-xs font-medium border border-gray-250 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary max-w-md w-full"
            >
              {sessions.map(session => (
                <option key={session.id} value={session.id}>
                  {session.title} — {session.sport} ({session.date} | {session.time})
                </option>
              ))}
            </select>
          </div>

          {regsLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={registrations}
              searchKey="memberName"
              searchPlaceholder="Search registered member..."
            />
          )}
        </div>
      )}
    </div>
  );
}
