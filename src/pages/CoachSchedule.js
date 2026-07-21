import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { CoachService } from '../services/coach';
import { mockCourts } from '../mock/data';
import { Plus, Edit2, XCircle, CheckCircle2, AlertCircle, X, Calendar } from 'lucide-react';

export default function CoachSchedule() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  // Form Field States
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('Badminton');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('04:00 PM');
  const [endTime, setEndTime] = useState('05:30 PM');
  const [court, setCourt] = useState('');
  const [description, setDescription] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Cancel Confirmation Modal State
  const [cancelModalSession, setCancelModalSession] = useState(null);

  const sportsList = ["Badminton", "Tennis", "Football Turf", "Basketball", "Table Tennis", "Cricket Net"];
  
  const timeSlotOptions = [
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "05:30 PM", "06:00 PM", "07:00 PM", "07:30 PM", "08:00 PM", "09:00 PM"
  ];

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const data = await CoachService.getSessions();
      setSessions([...data]);
    } catch (err) {
      console.error("Failed to load sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    const matchingCourts = mockCourts.filter(c => c.sport === sport);
    if (matchingCourts.length > 0 && !editingSession) {
      setCourt(matchingCourts[0].name);
    }
  }, [sport, editingSession]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleOpenCreateModal = () => {
    setEditingSession(null);
    setTitle('');
    setSport('Badminton');
    setDate(new Date().toISOString().split('T')[0]);
    setStartTime('04:00 PM');
    setEndTime('05:30 PM');
    const defaultCourt = mockCourts.find(c => c.sport === 'Badminton')?.name || 'Badminton Court 1';
    setCourt(defaultCourt);
    setDescription('');
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (session) => {
    setEditingSession(session);
    setTitle(session.title || '');
    setSport(session.sport || 'Badminton');
    setDate(session.date || '');
    setStartTime(session.startTime || '04:00 PM');
    setEndTime(session.endTime || '05:30 PM');
    setCourt(session.court || '');
    setDescription(session.description || '');
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = 'Session title is required';
    if (!sport) errors.sport = 'Sport selection is required';
    if (!date) errors.date = 'Date is required';
    if (!startTime) errors.startTime = 'Start time is required';
    if (!endTime) errors.endTime = 'End time is required';
    if (!court.trim()) errors.court = 'Court assignment is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        sport,
        date,
        startTime,
        endTime,
        court,
        description: description.trim()
      };

      if (editingSession) {
        await CoachService.updateSession(editingSession.id, payload);
        showNotification(`Practice session "${payload.title}" updated successfully!`);
      } else {
        await CoachService.createSession(payload);
        showNotification(`New practice session "${payload.title}" created successfully!`);
      }

      setIsModalOpen(false);
      await fetchSessions();
    } catch (err) {
      showNotification(err.message || 'Failed to save practice session', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmCancelSession = async () => {
    if (!cancelModalSession) return;
    try {
      await CoachService.cancelSession(cancelModalSession.id);
      showNotification(`Session "${cancelModalSession.title}" has been cancelled.`, 'success');
      setCancelModalSession(null);
      await fetchSessions();
    } catch (err) {
      showNotification(err.message || 'Failed to cancel session', 'error');
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Session Title', 
      render: (row) => (
        <div>
          <span className="font-bold text-gray-800">{row.title}</span>
          {row.description && (
            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{row.description}</p>
          )}
        </div>
      )
    },
    { 
      header: 'Sport', 
      render: (row) => (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 uppercase tracking-wider">
          {row.sport}
        </span>
      )
    },
    { header: 'Court Assigned', accessor: 'court' },
    { 
      header: 'Date', 
      render: (row) => new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    { header: 'Time Slot', accessor: 'time' },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${row.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
          {row.status || 'Active'}
        </span>
      ) 
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex items-center space-x-3 text-xs font-semibold">
          <button 
            onClick={() => handleOpenEditModal(row)}
            disabled={row.status === 'Cancelled'}
            className={`flex items-center space-x-1 ${row.status === 'Cancelled' ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:underline'}`}
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit</span>
          </button>
          {row.status !== 'Cancelled' && (
            <button 
              onClick={() => setCancelModalSession(row)}
              className="flex items-center space-x-1 text-red-600 hover:underline"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      )
    }
  ];

  const filterOptions = [
    { key: 'sport', label: 'Sport', options: sportsList },
    { key: 'status', label: 'Status', options: ['Active', 'Cancelled'] }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Practice Sessions" 
        description="Create, edit, and manage practice sessions and court allocations for your student cohorts."
      >
        <button
          onClick={handleOpenCreateModal}
          className="bg-primary hover:bg-primary-dark text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center space-x-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Create Practice Session</span>
        </button>
      </PageHeader>

      {/* Toast Notification Banner */}
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
          <button onClick={() => setNotification(null)} className="text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Schedule Data Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={sessions}
          searchKey="title"
          searchPlaceholder="Search practice sessions..."
          filterOptions={filterOptions}
        />
      )}

      {/* Create / Edit Practice Session Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 my-8 animate-scale-up">
            <div className="flex justify-between items-center pb-4 border-b border-gray-150 mb-5">
              <h3 className="font-bold text-gray-900 text-base flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                {editingSession ? 'Edit Practice Session' : 'Create Practice Session'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Session Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Intermediate Badminton Coaching"
                  className={`w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${formErrors.title ? 'border-red-500' : 'border-gray-250'}`}
                />
                {formErrors.title && <p className="text-red-500 text-[10px] mt-1">{formErrors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Sport <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white font-medium"
                  >
                    {sportsList.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white font-medium ${formErrors.date ? 'border-red-500' : 'border-gray-250'}`}
                  />
                  {formErrors.date && <p className="text-red-500 text-[10px] mt-1">{formErrors.date}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white font-medium"
                  >
                    {timeSlotOptions.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white font-medium"
                  >
                    {timeSlotOptions.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Court Assigned <span className="text-red-500">*</span>
                </label>
                <select
                  value={court}
                  onChange={(e) => setCourt(e.target.value)}
                  className={`w-full px-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white font-medium ${formErrors.court ? 'border-red-500' : 'border-gray-250'}`}
                >
                  {mockCourts.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.sport})</option>
                  ))}
                </select>
                {formErrors.court && <p className="text-red-500 text-[10px] mt-1">{formErrors.court}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-600 uppercase tracking-wider mb-1">
                  Session Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details about drills, focus areas, target skill levels..."
                  className="w-full px-3 py-2.5 border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="pt-4 border-t border-gray-150 flex justify-end space-x-3 text-xs">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-gray-250 rounded-xl hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow transition-all disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingSession ? 'Update Session' : 'Create Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 animate-scale-up">
            <h4 className="text-base font-bold text-gray-900 mb-2 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" /> Cancel Practice Session
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-5">
              Are you sure you want to cancel "{cancelModalSession.title}" scheduled on {cancelModalSession.date} at {cancelModalSession.time}?
            </p>
            <div className="flex justify-end space-x-3 text-xs">
              <button
                onClick={() => setCancelModalSession(null)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-semibold"
              >
                No, Keep Session
              </button>
              <button
                onClick={handleConfirmCancelSession}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow"
              >
                Yes, Cancel Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
