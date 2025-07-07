import React from "react";
import { NavLink } from "react-router-dom";
import navData from "../helper/navData"

const Sidebar: React.FC<{ userRole: string }> = ({ userRole }) => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-4 text-xl font-bold border-b border-gray-700">Admin Panel</div>
      <nav className="p-4 flex flex-col space-y-4">
        {navData
          .filter((item) => item.role.includes(userRole))
          .map(({ title, link, icon: Icon }) => (
            <NavLink
              key={title}
              to={link}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              <Icon size={18} />
              {title}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
};

export default Sidebar;