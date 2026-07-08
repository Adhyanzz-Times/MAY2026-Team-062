import React, { useState, useEffect } from 'react';
import { BookingService } from '../services/booking';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllBookings() {
      setLoading(true);
      try {
        const data = await BookingService.getBookings('admin');
        setBookings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllBookings();
  }, []);

  const handleAction = (bookingId, action) => {
    alert(`Action "${action}" triggered for Booking ID: ${bookingId}`);
  };

  const columns = [
    { header: 'Booking ID', accessor: 'id' },
    { header: 'Member', accessor: 'memberName' },
    { header: 'Facility / Court', accessor: 'courtName' },
    { header: 'Sport', accessor: 'sport' },
    { 
      header: 'Date & Time', 
      render: (row) => `${new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} | ${row.startTime}` 
    },
    { 
      header: 'Status', 
      render: (row) => {
        const colors = {
          Confirmed: 'bg-green-50 text-green-700 border-green-200',
          Pending: 'bg-yellow-50 text-yellow-750 border-yellow-250',
          Cancelled: 'bg-red-50 text-red-650 border-red-200',
          Completed: 'bg-gray-100 text-gray-700 border-gray-250'
        };
        return (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colors[row.status] || 'bg-gray-50 text-gray-500'}`}>
            {row.status}
          </span>
        );
      } 
    },
    {
      header: 'Action',
      render: (row) => (
        <div className="flex space-x-2 text-xs">
          <button 
            onClick={() => handleAction(row.id, 'Edit')}
            className="text-primary hover:underline font-semibold"
          >
            Edit
          </button>
          {row.status === 'Confirmed' && (
            <button 
              onClick={() => handleAction(row.id, 'Cancel')}
              className="text-red-600 hover:underline font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      )
    }
  ];

  const filterOptions = [
    { key: 'sport', label: 'Sport', options: ['Badminton', 'Football Turf', 'Tennis', 'Basketball'] },
    { key: 'status', label: 'Status', options: ['Confirmed', 'Pending', 'Cancelled', 'Completed'] }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Manage Bookings" 
        description="Monitor, update, or cancel member reservations and schedule court allocations."
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={bookings}
          searchPlaceholder="Search by member name..."
          searchKey="memberName"
          filterOptions={filterOptions}
        />
      )}
    </div>
  );
}
