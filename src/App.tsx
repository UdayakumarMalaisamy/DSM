import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/Dashboard";
import TeacherList from "./pages/Teacherlist";
import StudentList from "./pages/Studentlist";
import StudentProfile from "./pages/Studentlist";
import Attendance from "./pages/Attendance";
import Task from "./pages/Task";
import Result from "./pages/Result";
import Timetable from "./pages/Timetable";
import Calendar from "./pages/Calender";
import Parentslist from "./pages/Parentslist";

const App: React.FC = () => {
  const userRole = "admin"; // Set based on auth logic

  return (
    <Router>
      <div className="flex">
        <Sidebar userRole={userRole} />
        
        <main className="ml-64 p-6 w-full">
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />

            {/* Teacher Module Routes */}
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentProfile />} />
             <Route path="/parents" element={<Parentslist />} />
             
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/task" element={<Task />} />
            <Route path="/result" element={<Result />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/teachers" element={<TeacherList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
