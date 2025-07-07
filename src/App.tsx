// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

type UserRole = "admin" | "teacher" | "student" | "parent";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role") as UserRole | null;
    if (savedToken && savedRole) {
      setToken(savedToken);
      setUserRole(savedRole);
    }
  }, []);

  if (!token || !userRole) {
    return (
      <Login
        setToken={(token: string) => setToken(token)}
        setRole={(role: string) => setUserRole(role as UserRole)}
      />
    );
  }

  return (
    <Router>
      <div className="flex">
        <Sidebar userRole={userRole} />
        <main className="ml-64 p-6 w-full">
          <Routes>
            <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentProfile />} />
            <Route path="/parents" element={<Parentslist />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/task" element={<Task />} />
            <Route path="/result" element={<Result />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/teachers" element={<TeacherList />} />
            <Route
              path="/register"
              element={
                userRole === "admin" ? <Register token={token} /> : <Navigate to="/dashboard" />
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;