import React from 'react';

export default function StatsCard({ title, value, change, trend = 'up', icon: Icon, unit }) {
  return (
    <div className="premium-card p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-2 flex items-baseline">
          {value}
          {unit && <span className="text-sm font-medium text-gray-400 ml-1">{unit}</span>}
        </h3>
        
        {change && (
          <div className="flex items-center mt-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {change}
            </span>
            <span className="text-xs text-gray-400 ml-1.5">vs last month</span>
          </div>
        )}
      </div>
      
      {Icon && (
        <div className="p-3 rounded-xl bg-primary-soft text-primary">
          <Icon className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}
