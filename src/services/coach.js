import { mockCoachSessions, mockCoachRegistrations } from '../mock/data';

let activeSessions = [...mockCoachSessions];
let activeRegistrations = [...mockCoachRegistrations];

export const CoachService = {
  getSessions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(activeSessions);
      }, 300);
    });
  },

  createSession: async (sessionData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSession = {
          id: `S00${activeSessions.length + 1}`,
          status: 'Active',
          time: sessionData.startTime && sessionData.endTime 
            ? `${sessionData.startTime} - ${sessionData.endTime}` 
            : sessionData.time || '',
          ...sessionData
        };
        activeSessions.unshift(newSession);
        resolve(newSession);
      }, 400);
    });
  },

  updateSession: async (sessionId, updateData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = activeSessions.findIndex(s => s.id === sessionId);
        if (idx !== -1) {
          const current = activeSessions[idx];
          const startTime = updateData.startTime || current.startTime;
          const endTime = updateData.endTime || current.endTime;
          
          activeSessions[idx] = {
            ...current,
            ...updateData,
            time: startTime && endTime ? `${startTime} - ${endTime}` : current.time
          };
          resolve(activeSessions[idx]);
        } else {
          reject(new Error("Practice session not found"));
        }
      }, 300);
    });
  },

  cancelSession: async (sessionId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = activeSessions.findIndex(s => s.id === sessionId);
        if (idx !== -1) {
          activeSessions[idx] = {
            ...activeSessions[idx],
            status: 'Cancelled'
          };
          resolve(activeSessions[idx]);
        } else {
          reject(new Error("Practice session not found"));
        }
      }, 300);
    });
  },

  // Registration Helper Methods
  getRegistrations: async (sessionId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (sessionId) {
          resolve(activeRegistrations.filter(r => r.sessionId === sessionId));
        } else {
          resolve(activeRegistrations);
        }
      }, 300);
    });
  },

  getMemberRegistrations: async (memberId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(activeRegistrations.filter(r => r.memberId === memberId));
      }, 300);
    });
  },

  registerForSession: async (sessionId, memberId, memberName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const session = activeSessions.find(s => s.id === sessionId);
        if (!session) {
          reject(new Error("Session not found"));
          return;
        }
        if (session.status === 'Cancelled') {
          reject(new Error("Cannot register for a cancelled session"));
          return;
        }

        const existing = activeRegistrations.find(r => r.sessionId === sessionId && r.memberId === memberId);
        if (existing) {
          reject(new Error("You are already registered for this practice session"));
          return;
        }

        const newRegistration = {
          id: `R00${activeRegistrations.length + 1}`,
          sessionId,
          memberId,
          memberName: memberName || "Member",
          status: "Not Marked"
        };
        activeRegistrations.push(newRegistration);
        resolve(newRegistration);
      }, 300);
    });
  },

  cancelRegistration: async (sessionId, memberId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = activeRegistrations.findIndex(r => r.sessionId === sessionId && r.memberId === memberId);
        if (idx !== -1) {
          const removed = activeRegistrations.splice(idx, 1)[0];
          resolve(removed);
        } else {
          reject(new Error("Registration not found"));
        }
      }, 300);
    });
  },

  updateAttendanceStatus: async (registrationId, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = activeRegistrations.findIndex(r => r.id === registrationId);
        if (idx !== -1) {
          activeRegistrations[idx] = {
            ...activeRegistrations[idx],
            status
          };
          resolve(activeRegistrations[idx]);
        } else {
          reject(new Error("Registration record not found"));
        }
      }, 200);
    });
  }
};
