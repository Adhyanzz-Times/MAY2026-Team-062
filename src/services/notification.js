import { mockNotifications } from '../mock/data';

let activeNotifications = [...mockNotifications];

export const NotificationService = {
  getNotifications: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(activeNotifications);
      }, 250);
    });
  },

  markAllAsRead: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        activeNotifications = activeNotifications.map(n => ({
          ...n,
          read: true
        }));
        resolve(activeNotifications);
      }, 300);
    });
  },

  addNotification: (title, message) => {
    const newNotif = {
      id: `N00${activeNotifications.length + 1}`,
      title,
      message,
      time: "Just now",
      read: false
    };
    activeNotifications.unshift(newNotif);
    return newNotif;
  }
};
