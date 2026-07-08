import { mockEvents } from '../mock/data';

let activeEvents = [...mockEvents];

export const EventService = {
  getEvents: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(activeEvents);
      }, 300);
    });
  },

  registerForEvent: async (eventId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = activeEvents.findIndex(e => e.id === eventId);
        if (idx !== -1) {
          if (activeEvents[idx].seatsAvailable > 0) {
            activeEvents[idx] = {
              ...activeEvents[idx],
              seatsAvailable: activeEvents[idx].seatsAvailable - 1
            };
            resolve(activeEvents[idx]);
          } else {
            reject(new Error("No seats available for this event"));
          }
        } else {
          reject(new Error("Event not found"));
        }
      }, 400);
    });
  },

  recommendEvents: async (preferredSports) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // AI event personalization based on user preferred sports
        const recommended = activeEvents.map(event => {
          const isPreferred = preferredSports.some(sport => 
            event.sport.toLowerCase().includes(sport.toLowerCase()) || 
            event.title.toLowerCase().includes(sport.toLowerCase())
          );
          return {
            ...event,
            recommended: isPreferred
          };
        });
        resolve(recommended);
      }, 350);
    });
  }
};
