import { mockNotificationsByRole } from '../mock/data';

// Keep a separate mutable working copy per role so "mark all as read" for one
// role never touches another role's notifications.
let activeNotificationsByRole = {
  member: [...mockNotificationsByRole.member],
  coach: [...mockNotificationsByRole.coach],
  maintenance: [...mockNotificationsByRole.maintenance],
  admin: [...mockNotificationsByRole.admin]
};

export const NotificationService = {
  // role defaults to 'member' so any old call sites without a role keep working.
  getNotifications: async (role = 'member') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(activeNotificationsByRole[role] || []);
      }, 250);
    });
  },

  markAllAsRead: async (role = 'member') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        activeNotificationsByRole[role] = (activeNotificationsByRole[role] || []).map(n => ({
          ...n,
          read: true
        }));
        resolve(activeNotificationsByRole[role]);
      }, 300);
    });
  },

  addNotification: (role = 'member', title, message) => {
    const list = activeNotificationsByRole[role] || (activeNotificationsByRole[role] = []);
    const newNotif = {
      id: `N-${role}-${list.length + 1}`,
      title,
      message,
      time: "Just now",
      read: false
    };
    list.unshift(newNotif);
    return newNotif;
  }
};
