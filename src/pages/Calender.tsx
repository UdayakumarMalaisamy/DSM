// src/pages/AdminCalendarPage.tsx

import CollegeCalendarTable, { type CalendarEvent } from "../component/admin/CalenderTable";

// Mock data with correct types
const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 1,
    date: "2025-01-26",
    title: "Republic Day",
    description: "National Holiday",
    type: "Holiday",
  },
  {
    id: 2,
    date: "2025-04-10",
    title: "Mid-Term Exam",
    description: "Semester 2 Midterm Exam",
    type: "Exam",
  },
  {
    id: 3,
    date: "2025-05-15",
    title: "Guest Lecture",
    description: "AI in Education - Prof. Sharma",
    type: "Seminar",
  },
];

const AdminCalendarPage = () => {
  const userRole: "admin" | "teacher" | "student" | "parent" = "admin"; // Replace with real auth logic

  const handleSave = (updatedEvents: CalendarEvent[]) => {
    console.log("Updated Events:", updatedEvents);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">College Academic Calendar</h1>
      <CollegeCalendarTable initialEvents={mockCalendarEvents} userRole={userRole} onSave={handleSave} />
    </div>
  );
};

export default AdminCalendarPage;