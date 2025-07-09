import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface Course {
  id: number;
  time: string;
  class: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
}

export interface TimeTableProps {
  userRole: "admin" | "teacher" | "student" | "parent";
  onlyDay?: keyof Omit<Course, "id" | "time" | "class">;
}

const predefinedClasses = [
  "I-CS", "II-CS", "III-CS",
  "I-BCA", "II-BCA", "III-BCA",
  "I-IT", "II-IT", "III-IT",
];

const TimeTable: React.FC<TimeTableProps> = ({ userRole, onlyDay }) => {
  const [selectedClass, setSelectedClass] = useState<string>("I-CS");

  const [timetable, setTimetable] = useState<Course[]>([
    {
      id: 1,
      class: "I-CS",
      time: "9:00–10:00 AM",
      day1: "Maths",
      day2: "Physics",
      day3: "Chemistry",
      day4: "English",
      day5: "Computer",
    },
    {
      id: 2,
      class: "I-CS",
      time: "10:00–11:00 AM",
      day1: "Lab",
      day2: "Maths",
      day3: "Physics",
      day4: "",
      day5: "",
    },
    {
      id: 3,
      class: "II-CS",
      time: "9:00–10:00 AM",
      day1: "DBMS",
      day2: "CN",
      day3: "OS",
      day4: "AI",
      day5: "ML",
    },
    {
      id: 4,
      class: "II-CS",
      time: "10:00–11:00 AM",
      day1: "Compiler",
      day2: "",
      day3: "Maths",
      day4: "Cloud",
      day5: "Linux",
    },
  ]);

  const [editing, setEditing] = useState<{
    id: number;
    day: keyof Omit<Course, "id" | "time" | "class">;
  } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");

  const isEditable = userRole === "admin";

  const days: Array<keyof Omit<Course, "id" | "time" | "class">> = [
    "day1", "day2", "day3", "day4", "day5",
  ];

  const visibleDays = onlyDay ? [onlyDay] : days;

  const dayLabels: Record<string, string> = {
    day1: "Day 1",
    day2: "Day 2",
    day3: "Day 3",
    day4: "Day 4",
    day5: "Day 5",
  };

  const dayColors: Record<string, string> = {
    day1: "bg-red-50 text-red-800",
    day2: "bg-yellow-50 text-yellow-800",
    day3: "bg-green-50 text-green-800",
    day4: "bg-blue-50 text-blue-800",
    day5: "bg-purple-50 text-purple-800",
  };

  const handleEdit = (
    id: number,
    day: keyof Omit<Course, "id" | "time" | "class">,
    value: string
  ) => {
    if (!isEditable) return;
    setEditing({ id, day });
    setEditValue(value);
  };

  const handleSave = (
    id: number,
    day: keyof Omit<Course, "id" | "time" | "class">
  ) => {
    setTimetable((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, [day]: editValue } : row
      )
    );
    setEditing(null);
    setEditValue("");
  };

  const handleAddTimeSlot = () => {
    if (!newTime.trim()) return;
    const newId = Math.max(...timetable.map((c) => c.id), 0) + 1;
    setTimetable([
      ...timetable,
      {
        id: newId,
        time: newTime,
        class: selectedClass,
        day1: "",
        day2: "",
        day3: "",
        day4: "",
        day5: "",
      },
    ]);
    setNewTime("");
  };

  const filteredTimetable = timetable.filter(
    (row) => row.class === selectedClass
  );

  return (
    <div className="p-6 space-y-6">
      {/* Class Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold">🎓 Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        >
          {predefinedClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            📅 {onlyDay
              ? `Day Order Timetable (${dayLabels[onlyDay]})`
              : `Weekly Day Order Timetable - ${selectedClass}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Time</th>
                {visibleDays.map((day) => (
                  <th key={day} className="px-4 py-2 text-left">
                    {dayLabels[day]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTimetable.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-2 font-medium">{row.time}</td>
                  {visibleDays.map((day) => (
                    <td key={day} className="px-4 py-2">
                      {editing?.id === row.id && editing.day === day ? (
                        <div className="flex gap-2">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                          <Button size="sm" onClick={() => handleSave(row.id, day)}>
                            Save
                          </Button>
                        </div>
                      ) : (
                        <div
                          onClick={() => handleEdit(row.id, day, row[day])}
                          className={`rounded px-2 py-1 ${
                            row[day] ? dayColors[day] : ""
                          } ${
                            isEditable ? "cursor-pointer hover:bg-opacity-80" : ""
                          }`}
                        >
                          {row[day] || "—"}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Time Slot */}
      {isEditable && !onlyDay && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Time Slot</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2 items-center">
            <Input
              placeholder="e.g., 2:00–3:00 PM"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-60"
            />
            <Button onClick={handleAddTimeSlot}>Add</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimeTable;
