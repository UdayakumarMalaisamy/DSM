// src/pages/Dashboard.tsx
import React from "react";

// ✅ Allow all 4 roles
export interface DashboardProps {
  userRole: "admin" | "teacher" | "student" | "parent";
}

const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {userRole}</p>
    </div>
  );
};

export default Dashboard;
