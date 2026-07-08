// Mock Data for SportSync

export const mockUsers = [
  {
    id: "M001",
    name: "Arjun Mehta",
    email: "member@sportsync.demo",
    role: "member",
    preferredSports: ["Badminton", "Tennis"],
    phone: "+91 98765 43210",
    membershipType: "Premium",
    joinDate: "01 Jan 2026",
    expiryDate: "31 Dec 2026",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"
  },
  {
    id: "C101",
    name: "Coach Sandeep",
    email: "coach@sportsync.demo",
    role: "coach",
    phone: "+91 97777 66666",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150"
  },
  {
    id: "MT01",
    name: "Maintenance Staff",
    email: "maintenance@sportsync.demo",
    role: "maintenance",
    phone: "+91 96666 55555",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150"
  },
  {
    id: "A001",
    name: "Admin User",
    email: "admin@sportsync.demo",
    role: "admin",
    phone: "+91 99999 88888",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
  }
];

export const mockCourts = [
  { id: "C1", name: "Badminton Court 1", sport: "Badminton", status: "Available" },
  { id: "C2", name: "Badminton Court 2", sport: "Badminton", status: "Available" },
  { id: "C3", name: "Football Turf 1", sport: "Football Turf", status: "Available" },
  { id: "C4", name: "Tennis Court 1", sport: "Tennis", status: "Maintenance" },
  { id: "C5", name: "Basketball Court 1", sport: "Basketball", status: "Available" },
  { id: "C6", name: "Table Tennis Table 1", sport: "Table Tennis", status: "Available" },
  { id: "C7", name: "Cricket Net 1", sport: "Cricket Net", status: "Available" }
];

export const mockBookings = [
  {
    id: "B001",
    memberId: "M001",
    memberName: "Arjun Mehta",
    courtId: "C2",
    courtName: "Badminton Court 2",
    sport: "Badminton",
    date: "2026-07-06",
    startTime: "06:00 PM",
    endTime: "07:00 PM",
    status: "Confirmed"
  },
  {
    id: "B002",
    memberId: "M002",
    memberName: "Rohan",
    courtId: "C3",
    courtName: "Football Turf 1",
    sport: "Football Turf",
    date: "2026-07-06",
    startTime: "05:00 PM",
    endTime: "07:00 PM",
    status: "Confirmed"
  },
  {
    id: "B003",
    memberId: "M003",
    memberName: "Ishita",
    courtId: "C4",
    courtName: "Tennis Court 1",
    sport: "Tennis",
    date: "2026-07-07",
    startTime: "06:00 PM",
    endTime: "07:00 PM",
    status: "Pending"
  },
  {
    id: "B004",
    memberId: "M004",
    memberName: "Kabir",
    courtId: "C5",
    courtName: "Basketball Court 1",
    sport: "Basketball",
    date: "2026-07-05",
    startTime: "04:00 PM",
    endTime: "06:00 PM",
    status: "Cancelled"
  },
  {
    id: "B005",
    memberId: "M001",
    memberName: "Arjun Mehta",
    courtId: "C1",
    courtName: "Badminton Court 1",
    sport: "Badminton",
    date: "2026-07-02",
    startTime: "08:00 AM",
    endTime: "09:00 AM",
    status: "Completed"
  }
];

export const mockMemberships = {
  "M001": {
    id: "MEM-992",
    type: "Premium Membership",
    status: "Active",
    startDate: "01 Jan 2026",
    expiryDate: "31 Dec 2026",
    price: "₹ 5,000 / Year",
    benefits: [
      "Book all facilities 7 days in advance",
      "Participate in tournaments for free",
      "Priority booking slots during peak hours",
      "15% discounts on specialized coaching events"
    ]
  }
};

export const mockComplaints = [
  {
    id: "C001",
    memberId: "M001",
    memberName: "Arjun Mehta",
    title: "Flickering lights in Court 2",
    category: "Electrical",
    priority: "High",
    status: "Open",
    description: "The LED lights on the left side of Badminton Court 2 have been flickering constantly, causing visibility issues during evening matches.",
    date: "2026-07-04",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600"
  },
  {
    id: "C002",
    memberId: "M002",
    memberName: "Rohan",
    title: "Net tear on Tennis Court 1",
    category: "Equipment",
    priority: "Medium",
    status: "In Progress",
    description: "The central net on Tennis Court 1 has a tear near the bottom strap. Needs replacement or stitching.",
    date: "2026-07-03"
  },
  {
    id: "C003",
    memberId: "M003",
    memberName: "Isha",
    title: "Water leakage near locker room entrance",
    category: "Plumbing",
    priority: "Low",
    status: "Resolved",
    description: "There was water pooling outside the male locker room entrance from a ceiling pipe. Plumber fixed it on 4th July.",
    date: "2026-07-02"
  }
];

export const mockEvents = [
  {
    id: "E001",
    title: "Summer Badminton Tournament",
    date: "25 Jun 2026",
    time: "09:00 AM - 05:00 PM",
    sport: "Badminton",
    seatsAvailable: 8,
    totalSeats: 32,
    description: "Annual amateur singles tournament. Winners get vouchers and membership extensions.",
    recommended: true
  },
  {
    id: "E002",
    title: "Weekend Tennis Coaching Camp",
    date: "12 Jul 2026",
    time: "04:00 PM - 07:00 PM",
    sport: "Tennis",
    seatsAvailable: 5,
    totalSeats: 15,
    description: "Intensive drills under Coach Sandeep. Suitable for intermediate players.",
    recommended: true
  },
  {
    id: "E003",
    title: "Inter-Club Football Friendly",
    date: "20 Jul 2026",
    time: "05:00 PM - 08:00 PM",
    sport: "Football",
    seatsAvailable: 22,
    totalSeats: 40,
    description: "Register to join the club squad playing against WestEnd Sports Club.",
    recommended: false
  }
];

export const mockNotifications = [
  {
    id: "N001",
    title: "Booking Confirmed",
    message: "Your booking for Badminton Court 2 on 6th July, 06:00 PM is confirmed.",
    time: "10 mins ago",
    read: false
  },
  {
    id: "N002",
    title: "Maintenance Notice",
    message: "Tennis Court 1 is closed for routine court leveling till 8th July.",
    time: "2 hours ago",
    read: false
  },
  {
    id: "N003",
    title: "Tournament Registration Open",
    message: "Registrations for the Summer Badminton Tournament are closing soon. Only 8 spots left!",
    time: "1 day ago",
    read: true
  },
  {
    id: "N004",
    title: "Membership Renewal",
    message: "Your premium membership is active. Renewal date is 31 Dec 2026.",
    time: "3 days ago",
    read: true
  }
];

export const mockPartnerRecommendations = [
  {
    id: "P001",
    name: "Kabir Sharma",
    sport: "Badminton",
    level: "Intermediate",
    preferredTimes: "Weekdays 6 PM - 8 PM",
    matchScore: "95%"
  },
  {
    id: "P002",
    name: "Meera Nair",
    sport: "Tennis",
    level: "Advanced",
    preferredTimes: "Weekends Morning",
    matchScore: "88%"
  }
];

export const mockAdminInsights = {
  totalMembers: 245,
  todaysBookings: 18,
  openComplaints: 7,
  monthlyRevenue: "₹ 1,25,000",
  bookingsTrend: [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 15 },
    { day: "Wed", count: 10 },
    { day: "Thu", count: 18 },
    { day: "Fri", count: 22 },
    { day: "Sat", count: 30 },
    { day: "Sun", count: 28 }
  ]
};

export const timeSlots = [
  { time: "06:00 AM", available: true },
  { time: "07:00 AM", available: true },
  { time: "08:00 AM", available: true },
  { time: "09:00 AM", available: false },
  { time: "05:00 PM", available: false },
  { time: "06:00 PM", available: true, aiRecommended: true },
  { time: "07:00 PM", available: true },
  { time: "08:00 PM", available: true },
  { time: "09:00 PM", available: true },
  { time: "10:00 PM", available: true }
];
