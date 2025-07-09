"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  
  UserCheck,
  GraduationCap,
  UserX,
  User,
  UserX2,
} from "lucide-react";
import { useCalendarStore } from "@/store/useCalendarStore"; // 👈 Import your Zustand store

type UserRole = "admin" | "teacher" | "student" | "parent";

export default function Overview() {
  const [userRole, setUserRole] = useState<UserRole>("admin");

  const { events } = useCalendarStore(); // 👈 Get calendar events from global store

  // Sample data (you can replace this with real fetch/store logic)
  const totalStudents = 3;
  const totalParents = 3;
  const totalTeachers = 5;
  const absentTeachers = 1;

  const presentToday = 2;
  const absentToday = 1;
  const attendanceRate = Math.round((presentToday / totalStudents) * 100);
  const upcomingEvents = events.filter((e) => new Date(e.date) >= new Date()).length;

  const getDashboardCards = () => {
    const baseCards = [
      {
        title: "Total Students",
        value: totalStudents.toString(),
        description: "Enrolled students",
        icon: GraduationCap,
        color: "text-blue-600",
        bg: "bg-blue-100",
      },
      {
        title: "Present Today",
        value: presentToday.toString(),
        description: `${attendanceRate}% attendance rate`,
        icon: UserCheck,
        color: "text-green-600",
        bg: "bg-green-100",
      },
      {
        title: "Absent Today",
        value: absentToday.toString(),
        description: "Students absent",
        icon: UserX,
        color: "text-red-600",
        bg: "bg-red-100",
      },
      {
        title: "Upcoming Events",
        value: upcomingEvents.toString(), // 👈 Live from calendar store
        description: "This month",
        icon: Calendar,
        color: "text-purple-600",
        bg: "bg-purple-100",
      },
      {
        title: "Total Teachers",
        value: totalTeachers.toString(),
        description: "Faculty members",
        icon: User,
        color: "text-amber-600",
        bg: "bg-amber-100",
      },
      {
        title: "Absent Teachers",
        value: absentTeachers.toString(),
        description: "Teachers not present today",
        icon: UserX2,
        color: "text-rose-600",
        bg: "bg-rose-100",
      },
    ];

    if (userRole === "admin") {
      baseCards.push({
        title: "Total Parents",
        value: totalParents.toString(),
        description: "Registered parents",
        icon: Users,
        color: "text-orange-600",
        bg: "bg-orange-100",
      });
    }

    return baseCards;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here’s what’s happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value as UserRole)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
          </select>
          <span className="capitalize bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-lg">
            {userRole}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {getDashboardCards().map((card, index) => (
          <div
            key={index}
            className="bg-white border border-gray-300 rounded-xl p-4 hover:border-blue-500 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-gray-700 text-sm font-medium">{card.title}</h4>
              <div className={`p-2 rounded-full ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <div className="mt-2 text-2xl font-bold text-gray-900">{card.value}</div>
            <p className="text-xs text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white border border-gray-300 hover:border-blue-500 p-6 rounded-xl shadow-sm space-y-4 transition-all">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          {events.slice(-3).map((event) => (
            <li key={event.id} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {event.title} ({event.type}) - {event.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
