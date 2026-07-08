import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { CheckCircle } from 'lucide-react';

export default function MaintenanceComplaints() {
  const [complaints, setComplaints] = useState([
    { id: "C001", title: "Flickering lights in Court 2", category: "Electrical", priority: "High", status: "Open" },
    { id: "C002", title: "Net tear on Tennis Court 1", category: "Equipment", priority: "Medium", status: "In Progress" },
    { id: "C003", title: "Water leakage near locker room", category: "Plumbing", priority: "Low", status: "Resolved" }
  ]);

  const handleResolve = (id) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: "Resolved" };
      }
      return c;
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-750 border-yellow-250';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-green-50 text-green-750 border-green-200';
    }
  };

  const columns = [
    { header: 'Task ID', accessor: 'id' },
    { header: 'Issue Description', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Priority', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityColor(row.priority)}`}>
          {row.priority}
        </span>
      ) 
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ) 
    },
    {
      header: 'Action',
      render: (row) => (
        row.status !== 'Resolved' ? (
          <button
            onClick={() => handleResolve(row.id)}
            className="text-xs font-semibold text-primary hover:underline flex items-center space-x-1"
          >
            <CheckCircle className="h-3 w-3" />
            <span>Mark Resolved</span>
          </button>
        ) : (
          <span className="text-gray-405 font-medium">Resolved</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assigned Tasks Log" 
        description="View and log actions for facility repair reports assigned to you."
      />
      <DataTable
        columns={columns}
        data={complaints}
        searchKey="title"
        searchPlaceholder="Search tasks..."
      />
    </div>
  );
}
