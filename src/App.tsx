import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const userRole = "teacher"; // Replace this with actual role from login

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar userRole={userRole} />
                <main className="ml-64 p-6 w-full">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<StudentList data={[]} userRole={"admin"} columns={[]} />} />
                    <Route path="/students/:id" element={<StudentProfile data={[]} userRole={"admin"} columns={[]} />} />
                    <Route path="/parents" element={<Parentslist />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/teachers" element={<TeacherList />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
