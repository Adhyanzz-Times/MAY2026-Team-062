import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';

export default function CoachSchedule() {
  const [schedule] = useState([
    { id: "S1", title: "Intermediate Badminton Coaching", date: "2026-07-06", time: "04:00 PM - 05:30 PM", court: "Court 2" },
    { id: "S2", title: "Pro Tennis Drills Clinic", date: "2026-07-06", time: "06:00 PM - 07:30 PM", court: "Tennis Court 1" },
    { id: "S3", title: "Advanced Football Tactics", date: "2026-07-07", time: "05:00 PM - 07:00 PM", court: "Football Turf 1" },
    { id: "S4", title: "Beginner Table Tennis Session", date: "2026-07-08", time: "03:00 PM - 04:00 PM", court: "Table Tennis Table 1" }
  ]);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Session Title', accessor: 'title' },
    { header: 'Court Assigned', accessor: 'court' },
    { header: 'Date', accessor: 'date' },
    { header: 'Time Slot', accessor: 'time' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Coaching Schedule" 
        description="View your upcoming session slots and court allocations."
      />
      <DataTable
        columns={columns}
        data={schedule}
        searchKey="title"
        searchPlaceholder="Search schedule..."
      />
    </div>
  );
}
