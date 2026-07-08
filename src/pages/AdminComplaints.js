import React, { useState, useEffect } from 'react';
import { ComplaintService } from '../services/complaint';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const data = await ComplaintService.getComplaints('admin');
      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await ComplaintService.updateComplaintStatus(complaintId, newStatus);
      fetchComplaints();
    } catch (err) {
      alert("Failed to update status");
    }
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
      case 'Resolved': return 'bg-green-50 text-green-750 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-250';
    }
  };

  const columns = [
    { header: 'Complaint ID', accessor: 'id' },
    { header: 'Member', accessor: 'memberName' },
    { header: 'Title / Subject', accessor: 'title' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Priority', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(row.priority)}`}>
          {row.priority}
        </span>
      ) 
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      ) 
    },
    {
      header: 'Action',
      render: (row) => (
        <div className="flex items-center space-x-2 text-xs">
          {row.status !== 'Resolved' && (
            <>
              {row.status === 'Open' && (
                <button
                  onClick={() => handleStatusChange(row.id, 'In Progress')}
                  className="text-orange-655 hover:underline font-semibold flex items-center space-x-1"
                >
                  <AlertCircle className="h-3 w-3" />
                  <span>Process</span>
                </button>
              )}
              <button
                onClick={() => handleStatusChange(row.id, 'Resolved')}
                className="text-green-655 hover:underline font-semibold flex items-center space-x-1"
              >
                <CheckCircle className="h-3 w-3" />
                <span>Resolve</span>
              </button>
            </>
          )}
          {row.status === 'Resolved' && <span className="text-gray-400 font-medium">No actions</span>}
        </div>
      )
    }
  ];

  const filterOptions = [
    { key: 'category', label: 'Category', options: ['Electrical', 'Equipment', 'Plumbing', 'Facilities'] },
    { key: 'priority', label: 'Priority', options: ['Low', 'Medium', 'High'] },
    { key: 'status', label: 'Status', options: ['Open', 'In Progress', 'Resolved'] }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Manage Complaints" 
        description="Review reported problems, classify issues, dispatch technicians, and resolve concerns."
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={complaints}
          searchPlaceholder="Search complaints..."
          searchKey="title"
          filterOptions={filterOptions}
        />
      )}
    </div>
  );
}
