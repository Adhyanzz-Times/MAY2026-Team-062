import { mockComplaints } from '../mock/data';

let activeComplaints = [...mockComplaints];

export const ComplaintService = {
  getComplaints: async (role, memberId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (role === 'admin') {
          resolve(activeComplaints);
        } else {
          resolve(activeComplaints.filter(c => c.memberId === memberId));
        }
      }, 400);
    });
  },

  submitComplaint: async (complaintData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComplaint = {
          id: `C00${activeComplaints.length + 1}`,
          status: 'Open',
          date: new Date().toISOString().split('T')[0],
          ...complaintData
        };
        activeComplaints.unshift(newComplaint);
        resolve(newComplaint);
      }, 500);
    });
  },

  updateComplaintStatus: async (complaintId, status) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const idx = activeComplaints.findIndex(c => c.id === complaintId);
        if (idx !== -1) {
          activeComplaints[idx] = {
            ...activeComplaints[idx],
            status
          };
          resolve(activeComplaints[idx]);
        } else {
          reject(new Error("Complaint not found"));
        }
      }, 300);
    });
  },

  analyzeImage: async (fileName) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // AI image preview mock analyzer
        const lowercaseName = fileName.toLowerCase();
        if (lowercaseName.includes("light") || lowercaseName.includes("bulb") || lowercaseName.includes("flicker")) {
          resolve({
            issueDetected: "Light fixture defect / Flickering illumination",
            confidence: "94%",
            suggestedCategory: "Electrical",
            suggestedPriority: "High"
          });
        } else if (lowercaseName.includes("net") || lowercaseName.includes("tear") || lowercaseName.includes("torn")) {
          resolve({
            issueDetected: "Structural net tear / damaged tensioning strap",
            confidence: "88%",
            suggestedCategory: "Equipment",
            suggestedPriority: "Medium"
          });
        } else if (lowercaseName.includes("water") || lowercaseName.includes("leak") || lowercaseName.includes("pipe")) {
          resolve({
            issueDetected: "Liquid pooling / active pipe pressure drop",
            confidence: "91%",
            suggestedCategory: "Plumbing",
            suggestedPriority: "High"
          });
        } else {
          resolve({
            issueDetected: "Physical surface tear or hardware wear",
            confidence: "75%",
            suggestedCategory: "Facilities",
            suggestedPriority: "Medium"
          });
        }
      }, 800);
    });
  },

  detectDuplicate: async (title, description) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const query = `${title} ${description}`.toLowerCase();
        
        // Simple search logic for duplicates
        const duplicates = activeComplaints.filter(c => {
          if (c.status === 'Resolved') return false;
          
          const matchTitle = title && c.title.toLowerCase().includes(title.toLowerCase());
          const matchDesc = description && c.description && c.description.toLowerCase().includes(description.toLowerCase());
          
          // Also look for keywords
          const keywords = ['light', 'flicker', 'court 2', 'net', 'leak', 'water'];
          let kwMatches = 0;
          keywords.forEach(kw => {
            if (query.includes(kw) && c.title.toLowerCase().includes(kw)) {
              kwMatches++;
            }
          });
          
          return matchTitle || matchDesc || kwMatches >= 2;
        });

        if (duplicates.length > 0) {
          resolve({
            isDuplicate: true,
            existingComplaint: duplicates[0]
          });
        } else {
          resolve({
            isDuplicate: false
          });
        }
      }, 400);
    });
  }
};
