import { mockMemberships } from '../mock/data';

export const MembershipService = {
  getMembership: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMemberships[userId] || {
          id: "MEM-TEMP",
          type: "Standard Membership",
          status: "Inactive",
          startDate: "N/A",
          expiryDate: "N/A",
          price: "N/A",
          benefits: ["Standard court booking limits"]
        });
      }, 350);
    });
  },

  renewMembership: async (userId, planType) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const renewed = {
          id: `MEM-${Math.floor(100 + Math.random() * 900)}`,
          type: planType,
          status: "Active",
          startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          price: planType.includes("Premium") ? "₹ 5,000 / Year" : "₹ 2,500 / Year",
          benefits: planType.includes("Premium") ? [
            "Book all facilities 7 days in advance",
            "Participate in tournaments for free",
            "Priority booking slots during peak hours",
            "15% discounts on specialized coaching events"
          ] : [
            "Book all facilities 3 days in advance",
            "Participate in tournaments with fee",
            "Standard booking support"
          ]
        };
        mockMemberships[userId] = renewed;
        
        // Update user session expiry date if loaded
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const userObj = JSON.parse(userStr);
          if (userObj.id === userId) {
            userObj.membershipType = planType;
            userObj.expiryDate = renewed.expiryDate;
            localStorage.setItem('user', JSON.stringify(userObj));
          }
        }

        resolve(renewed);
      }, 600);
    });
  }
};
