import { mockPartnerRecommendations, mockAdminInsights } from '../mock/data';

export const AIService = {
  chat: async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const query = message.toLowerCase();
        let reply = "";

        if (query.includes("membership") || query.includes("expire") || query.includes("validity")) {
          reply = "Your Premium Membership is active and valid until 31 Dec 2026. You can renew it at any time in the 'Membership' tab.";
        } else if (query.includes("booking") || query.includes("book court") || query.includes("slots")) {
          reply = "You have 2 upcoming bookings. If you want to book a new court, I recommend Badminton Court 2 tomorrow at 06:00 PM, as that slot is currently available and fits your usual playtime.";
        } else if (query.includes("event") || query.includes("tournament") || query.includes("happen")) {
          reply = "The 'Summer Badminton Tournament' is happening on 25 Jun 2026. We also have a 'Weekend Tennis Coaching Camp' on 12 Jul 2026. You can register for both in the 'Events' section!";
        } else if (query.includes("partner") || query.includes("play with") || query.includes("practice")) {
          reply = "I recommend practicing with Kabir Sharma (Badminton, Intermediate level, 95% playstyle match) or Meera Nair (Tennis, Advanced level, 88% playstyle match).";
        } else if (query.includes("complaint") || query.includes("issue")) {
          reply = "You can report court damages or lighting issues in the 'Complaints' section. If you upload a picture, I will automatically classify the category and check if the maintenance team is already working on it.";
        } else {
          reply = "Hello! I am your SportSync AI assistant. I can help you check membership status, find recommended available slots, suggest practice partners, register for tournaments, or report maintenance issues. What would you like to do?";
        }

        resolve({
          sender: "ai",
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }, 600);
    });
  },

  recommendPracticePartner: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPartnerRecommendations);
      }, 300);
    });
  },

  recommendPartner: async () => {
    return AIService.recommendPracticePartner();
  },

  getInsights: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockAdminInsights);
      }, 400);
    });
  },

  dashboardInsights: async () => {
    return AIService.getInsights();
  }
};
