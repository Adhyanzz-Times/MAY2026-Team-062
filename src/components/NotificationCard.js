import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationCard({ notification }) {
  const { title, message, time, read } = notification;

  return (
    <div className={`premium-card p-4 hover-premium flex items-start space-x-3 transition-colors ${!read ? 'bg-purple-50/20 border-l-4 border-l-primary' : ''}`}>
      <div className={`p-2 rounded-lg ${!read ? 'bg-primary-soft text-primary' : 'bg-gray-150 text-gray-500'}`}>
        <Bell className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className={`text-sm font-semibold text-gray-800 ${!read ? 'font-bold' : ''}`}>{title}</h4>
          <span className="text-[10px] text-gray-400">{time}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{message}</p>
      </div>
      {!read && (
        <span className="h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0 mt-1" />
      )}
    </div>
  );
}
