# SportSync – Sports Club Management System

SportSync is a frontend prototype of a **Sports Club Management System** developed as part of the **IIT Madras Software Engineering** course (Milestone 2).

The application aims to digitize common sports club operations such as court booking, membership management, complaint reporting, practice scheduling, and administrative monitoring through a modern web interface.

This version is a **frontend-only implementation**. All interactions use mocked services and data to simulate backend APIs, allowing the frontend to be developed independently and integrated with backend services in later milestones.

---

## Features

### Member

- Dashboard
- Court and Turf Booking
- Smart Slot Recommendations
- Natural Language Booking
- View and Manage Bookings
- Membership Management
- Event Registration
- Raise Facility Complaints
- AI-assisted Complaint Categorization
- AI Duplicate Complaint Detection
- AI Assistant
- Notifications
- Profile Management

### Coach

- Dashboard
- View Coaching Schedule
- Manage Attendance
- AI Scheduling Insights
- Notifications
- Profile

### Maintenance Staff

- Dashboard
- View Assigned Maintenance Tasks
- Update Complaint Status
- AI Complaint Summaries
- Notifications
- Profile

### Administrator

- Dashboard
- Manage Members
- Manage Bookings
- Manage Complaints
- Reports and Analytics
- AI-generated Operational Insights
- Membership Renewal Insights

---

## AI Features

The frontend demonstrates the following AI-assisted workflows using mocked responses:

- Smart Slot Recommendation
- Natural Language Booking
- AI Club Assistant
- AI Practice Partner Recommendation
- AI Event Recommendation
- AI Complaint Classification
- AI Image-based Complaint Analysis
- AI Duplicate Complaint Detection
- AI Membership Renewal Prediction
- AI Operational Insights

---

## Technology Stack

- React
- JavaScript (ES6)
- Tailwind CSS
- React Router DOM
- Lucide React
- Context API

---

## Project Structure

```
src/
├── components/
├── contexts/
├── layouts/
├── mock/
├── pages/
├── services/
└── assets/
```

### Folder Description

- **components/** – Reusable UI components
- **contexts/** – Authentication and shared application state
- **layouts/** – Shared page layouts
- **mock/** – Mock data used during frontend development
- **pages/** – Application screens
- **services/** – Mock service layer that simulates backend APIs
- **assets/** – Static resources

---

## Running the Project

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm start
```

The application will be available at:

```
http://localhost:3000
```

### Production Build

```bash
npm run build
```

---

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Member | member@sportsync.demo | password |
| Coach | coach@sportsync.demo | password |
| Maintenance | maintenance@sportsync.demo | password |
| Admin | admin@sportsync.demo | password |

---

## Notes

- This project represents the frontend implementation for **Milestone 2**.
- Authentication, AI features, and backend interactions are currently simulated using mocked services.
- The application architecture has been designed to allow seamless integration with backend APIs in future milestones by replacing the mock service layer.
