import { mockUsers } from '../mock/data';

export const AuthService = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('user');
        resolve(true);
      }, 300);
    });
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: `M00${mockUsers.length + 1}`,
          ...userData,
          role: 'member',
          membershipType: 'Standard',
          joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          expiryDate: 'Not Active',
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
        };
        mockUsers.push(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve(newUser);
      }, 600);
    });
  },

  resetPassword: async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user) {
          resolve({ message: "Password reset link sent to your email." });
        } else {
          reject(new Error("Email not found."));
        }
      }, 500);
    });
  }
};
