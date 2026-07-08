import { mockBookings, mockCourts, timeSlots } from '../mock/data';

let activeBookings = [...mockBookings];

export const BookingService = {
  getBookings: async (role, memberId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (role === 'admin') {
          resolve(activeBookings);
        } else {
          resolve(activeBookings.filter(b => b.memberId === memberId));
        }
      }, 400);
    });
  },

  getAvailableSlots: async (courtId, date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return standard slots. In a real app we'd filter slots by existing bookings on that date/court.
        const bookingsForDate = activeBookings.filter(b => b.courtId === courtId && b.date === date && b.status === "Confirmed");
        
        const mappedSlots = timeSlots.map(slot => {
          const isTaken = bookingsForDate.some(b => b.startTime === slot.time);
          return {
            ...slot,
            available: !isTaken
          };
        });
        
        resolve(mappedSlots);
      }, 300);
    });
  },

  bookCourt: async (bookingData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = {
          id: `B00${activeBookings.length + 1}`,
          status: 'Confirmed',
          ...bookingData
        };
        activeBookings.unshift(newBooking);
        resolve(newBooking);
      }, 500);
    });
  },

  cancelBooking: async (bookingId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = activeBookings.findIndex(b => b.id === bookingId);
        if (idx !== -1) {
          // Instead of deleting, we change status to Cancelled
          activeBookings[idx] = {
            ...activeBookings[idx],
            status: 'Cancelled'
          };
          resolve(activeBookings[idx]);
        } else {
          reject(new Error("Booking not found"));
        }
      }, 300);
    });
  },

  recommendSlot: async (sport, date) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // AI slot recommendation
        const courts = mockCourts.filter(c => c.sport === sport && c.status === "Available");
        if (courts.length === 0) {
          resolve(null);
          return;
        }
        const court = courts[0];
        resolve({
          courtId: court.id,
          courtName: court.name,
          sport: court.sport,
          date: date,
          startTime: "06:00 PM",
          endTime: "07:00 PM",
          reason: "Historically, you play Badminton at 6 PM. Weather tomorrow is perfect for outdoor games, and this court has excellent lighting."
        });
      }, 400);
    });
  },

  getCourtsBySport: async (sport) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCourts.filter(c => c.sport === sport));
      }, 200);
    });
  }
};
