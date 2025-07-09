// src/pages/sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import navData from "../helper/navData";

interface SidebarProps {
  userRole: "admin" | "teacher" | "student" | "parent";
}

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 text-2xl font-bold tracking-wide bg-gray-800 border-b border-gray-700">
        🎓 {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Panel
      </div>

      {/* Nav Links */}
      <nav className="p-4 flex-1 overflow-y-auto space-y-1">
        {navData
          .filter((item) => item.role.includes(userRole))
          .map(({ title, link, icon: Icon }) => (
            <NavLink
              key={title}
              to={link}
              className={({ isActive }) =>
                `group flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`
              }
            >
              <Icon className="text-lg transition-transform group-hover:scale-110" />
              <span className="text-sm font-medium">{title}</span>
            </NavLink>
          ))}
      </nav>

      {/* Footer (optional) */}
      <div className="p-4 text-xs text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} Department App
      </div>
    </aside>
  );
};

export default Sidebar;
