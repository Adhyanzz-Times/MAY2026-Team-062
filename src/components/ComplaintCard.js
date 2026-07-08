import React from 'react';
import { ShieldCheck, AlertOctagon } from 'lucide-react';

export default function ComplaintCard({ complaint }) {
  const { id, title, category, priority, status, description, date, imageUrl } = complaint;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Resolved': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-150 text-gray-700 border-gray-200';
    }
  };

  // Mock analysis result
  const mockAIAnalysis = category === 'Electrical' ? {
    issueDetected: "Light fixture defect / Flickering illumination",
    confidence: "94%",
    duplicateMatches: 0
  } : null;

  return (
    <div className="premium-card p-5 hover-premium">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <div>
          <span className="text-xs font-semibold text-gray-400">ID: {id}</span>
          <h4 className="text-lg font-bold text-gray-800 mt-0.5">{title}</h4>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getPriorityColor(priority)}`}>
            {priority}
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>

      {imageUrl && (
        <div className="mb-4 rounded-lg overflow-hidden border border-gray-100 max-h-48 bg-gray-55 flex items-center justify-center">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* AI classification / scan results */}
      {mockAIAnalysis && (
        <div className="mb-4 bg-purple-50/50 border border-purple-100 rounded-lg p-3 text-xs text-purple-950 flex items-start space-x-2">
          <AlertOctagon className="h-4 w-4 text-purple-700 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-purple-800">AI Analysis:</span> classified as <span className="font-semibold">{category}</span>.
            <div>Detected: <span className="font-semibold">{mockAIAnalysis.issueDetected} ({mockAIAnalysis.confidence} Confidence)</span>.</div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
        <span>Reported on: {date}</span>
        <span className="flex items-center text-primary-dark">
          <ShieldCheck className="h-4 w-4 mr-1 text-primary" /> Category: {category}
        </span>
      </div>
    </div>
  );
}
