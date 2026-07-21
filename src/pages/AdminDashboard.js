import React, { useState, useEffect } from 'react';
import { AIService } from '../services/ai';
import { ComplaintService } from '../services/complaint';
import PageHeader from '../components/PageHeader';
import StatsCard from '../components/StatsCard';
import { Users, Calendar, AlertCircle, IndianRupee, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [kpis, setKpis] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const insights = await AIService.getInsights();
        setKpis(insights);

        const activeComplaints = await ComplaintService.getComplaints('admin');
        setComplaints(activeComplaints.slice(0, 3)); // show top 3
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-750 border-yellow-250';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Admin Dashboard" 
        description="Overall facility stats, revenue records, active complaints and automated AI insights."
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard title="Total Members" value={kpis?.totalMembers} icon={Users} change="+4.2%" />
        <StatsCard title="Today's Bookings" value={kpis?.todaysBookings} icon={Calendar} change="+12%" />
        <StatsCard title="Open Complaints" value={kpis?.openComplaints} icon={AlertCircle} change="-2" trend="down" />
        <StatsCard title="Monthly Revenue" value={kpis?.monthlyRevenue} icon={IndianRupee} change="+8.1%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Booking Analytics Chart and AI insights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Display */}
          <div className="premium-card p-6">
            <h4 className="font-bold text-gray-800 text-base mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" /> Bookings Overview (Weekly)
            </h4>
            
            <div className="flex items-end justify-between h-48 pt-4 px-2 select-none border-b border-gray-150">
              {kpis?.bookingsTrend?.map((trend, idx) => (
                <div key={idx} className="flex flex-col items-center group w-1/8">
                  {/* Tooltip bar */}
                  <span className="opacity-0 group-hover:opacity-100 bg-charcoal text-white text-[10px] py-1 px-2 rounded absolute -translate-y-8 transition-opacity duration-200 shadow font-bold">
                    {trend.count} bookings
                  </span>
                  {/* Graphic Bar */}
                  <div 
                    className="w-8 bg-primary rounded-t-md hover:bg-primary-dark transition-all duration-300"
                    style={{ height: `${(trend.count / 35) * 100}%`, minHeight: '8px' }}
                  />
                  <span className="text-[10px] text-gray-400 font-bold mt-2">{trend.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights Widget */}
          <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-6 shadow border border-purple-800/20 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 top-0 w-1/4 bg-white/5 skew-x-12 translate-x-8 pointer-events-none" />
            <h4 className="text-base font-bold mb-3 flex items-center text-purple-100">
              <Sparkles className="h-4.5 w-4.5 mr-1.5 fill-purple-300 text-purple-300" /> AI-Generated Platform Insights
            </h4>
            <ul className="text-xs text-purple-200/95 space-y-3 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-purple-300 font-bold">•</span>
                <span>Peak booking hours identified: 06:00 PM - 08:00 PM. Suggest creating dynamic peak-pricing slots to increase slot availability.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-purple-300 font-bold">•</span>
                <span>Electrical category has the longest resolution time average (3.2 days). Dispatch alerts have been automated to help response rates.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column Stack */}
        <div className="space-y-6">
          {/* Recent Complaints Log */}
          <div className="premium-card p-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
              <h4 className="font-bold text-gray-800 text-base">Recent Complaints</h4>
              <Link to="/admin/complaints" className="text-xs font-semibold text-primary hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {complaints.map((comp) => (
                <div key={comp.id} className="p-3 bg-gray-50/50 rounded-lg border border-gray-150 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-800 truncate pr-4">{comp.title}</span>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${getPriorityColor(comp.priority)}`}>
                      {comp.priority}
                    </span>
                  </div>
                  <p className="text-gray-455 line-clamp-1 mb-2">{comp.description}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span>By {comp.memberName}</span>
                    <span className="font-bold text-primary-dark">{comp.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Membership Renewal Risk Widget */}
          <div className="premium-card p-6 border border-purple-200">
            <h4 className="font-bold text-gray-800 text-xs pb-3 border-b border-gray-150 mb-4 flex items-center">
              <Sparkles className="h-4 w-4 mr-1.5 text-primary fill-purple-200" />
              AI Renewal Risk Prediction
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-red-50/50 border border-red-150 rounded-xl text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-red-800">Isha Sen</span>
                  <span className="bg-red-100 text-red-700 text-[9px] px-1.5 py-0.5 rounded font-bold">High Risk</span>
                </div>
                <p className="text-[10px] text-gray-505">Inactivity: 30 days. Booking frequency dropped 80%.</p>
                <button onClick={() => alert('Sent renewal reminder email to Isha Sen')} className="mt-2 text-[10px] font-bold text-primary hover:underline">
                  Send Reminder Alert
                </button>
              </div>
              <div className="p-3 bg-amber-50/50 border border-amber-150 rounded-xl text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-amber-800">Rohan Kulkarni</span>
                  <span className="bg-amber-100 text-amber-750 text-[9px] px-1.5 py-0.5 rounded font-bold">Medium Risk</span>
                </div>
                <p className="text-[10px] text-gray-505">Expiry: 15 days. Unresolved complaints history.</p>
                <button onClick={() => alert('Sent renewal reminder promo code to Rohan Kulkarni')} className="mt-2 text-[10px] font-bold text-primary hover:underline">
                  Send Promotion Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
