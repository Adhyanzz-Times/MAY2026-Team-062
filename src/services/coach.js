import { mockCoachSessions } from '../mock/data';

let activeSessions = [...mockCoachSessions];

export const CoachService = {
  getSessions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(activeSessions);
      }, 300);
    });
  }
};
