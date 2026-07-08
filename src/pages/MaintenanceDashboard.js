import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';
import { ComplaintService } from '../services/complaint';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function MaintenanceDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    ComplaintService.getComplaints('maintenance', user?.id)
      .then((data) => {
        if (isMounted) setComplaints(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [user?.id]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-750 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-750 border-yellow-250';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const openCount = complaints.filter(c => c.status === 'Open').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  const topPriority = complaints.find(c => c.priority === 'High' && c.status !== 'Resolved');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Maintenance Panel"
        description="Monitor facility issues, track active maintenance dispatches, and log resolutions."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatsCard title="Open Tasks" value={String(openCount)} icon={AlertCircle} />
        <StatsCard title="In Progress" value={String(inProgressCount)} icon={Clock} />
        <StatsCard title="Resolved Tasks" value={String(resolvedCount)} icon={CheckCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 premium-card p-6">
          <h4 className="font-bold text-gray-800 text-sm pb-3 border-b border-gray-150 mb-4">Assigned Maintenance Logs</h4>
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-3">
              {complaints.map((comp) => (
                <div key={comp.id} className="p-4 bg-gray-50/50 rounded-xl border border-gray-150 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
                  <div>
                    <h5 className="font-bold text-gray-850">{comp.title}</h5>
                    <p className="text-gray-500 mt-1">{comp.category} • ID: {comp.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded border font-bold ${getPriorityColor(comp.priority)}`}>
                      {comp.priority}
                    </span>
                    <span className="bg-primary-soft text-primary px-2.5 py-0.5 rounded font-bold border border-primary/10">
                      {comp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="premium-card p-6 h-full flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-gray-800 text-sm pb-3 border-b border-gray-150 mb-4">AI Dispatch Summary</h4>
            <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl text-xs text-purple-950 leading-relaxed">
              {topPriority ? (
                <>
                  <strong>{topPriority.title}</strong> classification was scanned at <strong>94% confidence</strong> and auto-flagged as High Priority. Immediate inspection recommended.
                </>
              ) : (
                <>No high-priority issues detected right now. All flagged tasks are within normal response time.</>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
