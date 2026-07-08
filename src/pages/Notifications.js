import React, { useState, useEffect } from 'react';
import { NotificationService } from '../services/notification';
import PageHeader from '../components/PageHeader';
import NotificationCard from '../components/NotificationCard';
import { Check } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await NotificationService.getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const updated = await NotificationService.markAllAsRead();
      setNotifications(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notifications" 
        description="Stay up to date with court booking updates, schedule changes, and tournament alerts."
      >
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="border border-gray-250 bg-white font-semibold text-xs px-4 py-2 rounded-lg hover:bg-gray-55 hover:border-gray-300 transition-colors flex items-center space-x-1.5"
          >
            <Check className="h-4 w-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </PageHeader>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 premium-card bg-gray-55/50">
          <p className="text-sm text-gray-400 font-medium">No notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-3 max-w-3xl">
          {notifications.map((notif) => (
            <NotificationCard key={notif.id} notification={notif} />
          ))}
        </div>
      )}
    </div>
  );
}
