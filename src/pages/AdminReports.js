import React from 'react';
import PageHeader from '../components/PageHeader';
import { FileText, Download, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function AdminReports() {
  const reports = [
    { id: "REP001", name: "June Court Utilization Report", date: "30 Jun 2026", type: "PDF", size: "1.2 MB", desc: "Detailed analysis of badminton, tennis, and football turf usage rates." },
    { id: "REP002", name: "Q2 Financial Analytics Summary", date: "15 Jun 2026", type: "PDF", size: "2.4 MB", desc: "Overview of membership subscription fees, renewal payments, and court booking fees." },
    { id: "REP003", name: "Maintenance Resolution Speed Index", date: "01 Jun 2026", type: "PDF", size: "950 KB", desc: "Evaluation of equipment, electrical, and plumbing repair response times." }
  ];

  const handleDownload = (name) => {
    alert(`Starting download of mock file: "${name}"`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports & Analytics" 
        description="Download monthly utilization reviews, financial audits, and maintenance efficiency spreadsheets."
      />

      {/* Analytics highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="premium-card p-5 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Court Utilization</span>
            <h5 className="font-bold text-gray-800 text-sm mt-0.5">82% Average usage</h5>
          </div>
        </div>

        <div className="premium-card p-5 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Membership Renewals</span>
            <h5 className="font-bold text-gray-800 text-sm mt-0.5">94% Retention rate</h5>
          </div>
        </div>

        <div className="premium-card p-5 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 font-bold uppercase">Active Days</span>
            <h5 className="font-bold text-gray-800 text-sm mt-0.5">7 Days / Week</h5>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4 max-w-4xl">
        <h4 className="font-bold text-gray-800 text-sm pl-1">Available Document Downloads</h4>
        
        {reports.map((rep) => (
          <div key={rep.id} className="premium-card p-5 hover-premium flex items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-150 text-gray-400 flex-shrink-0 mt-0.5 sm:mt-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h5 className="font-bold text-gray-800 text-sm">{rep.name}</h5>
                <p className="text-xs text-gray-500 mt-1 max-w-xl">{rep.desc}</p>
                <div className="flex items-center space-x-4 mt-2 text-[10px] text-gray-400">
                  <span>Created: {rep.date}</span>
                  <span>Size: {rep.size}</span>
                  <span>Format: {rep.type}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(rep.name)}
              className="bg-primary hover:bg-primary-dark text-white p-2.5 rounded-lg transition-all shadow flex items-center space-x-1 font-semibold text-xs flex-shrink-0"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
