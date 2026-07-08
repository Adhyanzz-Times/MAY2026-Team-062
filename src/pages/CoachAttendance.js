import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';

export default function CoachAttendance() {
  const [trainees, setTrainees] = useState([
    { id: "T1", name: "Rohan Kulkarni", sport: "Badminton", cohort: "Intermediate Group", status: "Present" },
    { id: "T2", name: "Isha Sen", sport: "Tennis", cohort: "Advanced Group", status: "Present" },
    { id: "T3", name: "Kabir Sharma", sport: "Badminton", cohort: "Intermediate Group", status: "Absent" },
    { id: "T4", name: "Amit Patel", sport: "Football", cohort: "Tactics Class", status: "Present" }
  ]);

  const toggleStatus = (id) => {
    setTrainees(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === "Present" ? "Absent" : "Present"
        };
      }
      return t;
    }));
  };

  const columns = [
    { header: 'Trainee ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Sport', accessor: 'sport' },
    { header: 'Cohort', accessor: 'cohort' },
    { 
      header: 'Attendance Status', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${row.status === 'Present' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-650 border-red-200'}`}>
          {row.status}
        </span>
      ) 
    },
    {
      header: 'Action',
      render: (row) => (
        <button
          onClick={() => toggleStatus(row.id)}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Toggle status
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance Roster" 
        description="Mark and review the daily attendance log of your registered student cohorts."
      />
      <DataTable
        columns={columns}
        data={trainees}
        searchKey="name"
        searchPlaceholder="Search trainee..."
      />
    </div>
  );
}
