import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Page components
import Sidebar from "./pages/sidebar";
import Dashboard from "./pages/Dashboard";
import TeacherList from "./pages/Teacherlist";
import StudentList from "./pages/Studentlist";
import Attendance from "./pages/Attendance";
import Task from "./pages/Task";
import Result from "./pages/Result";
import Timetable from "./component/admin/TimeTable";
import Calendar from "./pages/Calender";
import Parentslist from "./pages/Parentslist";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Define allowed user roles
type UserRole = "admin" | "teacher" | "student" | "parent";

// Helper to safely get user role
const getUserRole = (): UserRole => {
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "teacher" || role === "student" || role === "parent") {
    return role;
  }
  return "teacher"; // Default fallback
};

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const userRole = getUserRole(); // safely typed userRole

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
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
                    <Route path="/students" element={<StudentList />} />
                    <Route path="/parents" element={<Parentslist />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/task" element={<Task />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/timetable" element={<Timetable userRole={"admin"} />} />
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
