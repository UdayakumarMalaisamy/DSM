import React, { useState } from "react";

interface Course {
  id: number;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

interface TimeTableProps {
  userRole: "admin" | "teacher" | "student" | "parent";
}

const TimeTable: React.FC<TimeTableProps> = ({ userRole }) => {
  const [timetable, setTimetable] = useState<Course[]>([
    {
      id: 1,
      time: "9:00–10:00 AM",
      monday: "Foundations of CS",
      tuesday: "Data Structures",
      wednesday: "",
      thursday: "Algorithms",
      friday: "Operating Systems",
    },
    {
      id: 2,
      time: "10:00–11:00 AM",
      monday: "",
      tuesday: "Programming Lab",
      wednesday: "Discrete Math",
      thursday: "",
      friday: "Programming Lab",
    },
    {
      id: 3,
      time: "11:00–12:00 PM",
      monday: "Databases",
      tuesday: "",
      wednesday: "CS Tutorial",
      thursday: "DS Tutorial",
      friday: "",
    },
    {
      id: 4,
      time: "12:00–1:00 PM",
      monday: "Lunch break",
      tuesday: "Lunch break",
      wednesday: "Lunch break",
      thursday: "Lunch break",
      friday: "Lunch break",
    },
  ]);

  const [editing, setEditing] = useState<{ id: number; day: keyof Omit<Course, "id" | "time"> } | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [newTime, setNewTime] = useState<string>("");

  const canEdit = userRole === "admin";

  const handleEdit = (id: number, day: keyof Omit<Course, "id" | "time">, value: string) => {
    if (!canEdit) return;
    setEditing({ id, day });
    setEditValue(value);
  };

  const handleSave = (id: number, day: keyof Omit<Course, "id" | "time">) => {
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
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
      },
    ]);
    setNewTime("");
  };

  // Only include editable string fields
  const days: Array<keyof Omit<Course, "id" | "time">> = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow rounded">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-left">Time</th>
              {days.map((day) => (
                <th key={day} className="p-3 text-left capitalize">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((course) => (
              <tr key={course.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{course.time}</td>
                {days.map((day) => (
                  <td key={day} className="p-3">
                    {editing?.id === course.id && editing?.day === day ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="border rounded p-1 text-sm w-48"
                          placeholder="Enter class"
                        />
                        <button
                          onClick={() => handleSave(course.id, day)}
                          className="bg-blue-800 text-white px-2 py-1 rounded hover:bg-blue-900 transition"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() =>
                          handleEdit(course.id, day, course[day])
                        }
                        className={canEdit ? "cursor-pointer hover:bg-gray-200 p-1 rounded" : ""}
                      >
                        {course[day] || "–"}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {canEdit && (
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            placeholder="e.g., 3:00–4:00 PM"
            className="border rounded p-2 text-sm w-48"
          />
          <button
            onClick={handleAddTimeSlot}
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            Add Time Slot
          </button>
        </div>
      )}

      <p className="mt-4 text-sm text-gray-600">
        {canEdit
          ? "Click a cell to edit the course or event. Changes are saved in memory."
          : "This is a read-only view of the timetable."}
      </p>
    </div>
  );
};

export default TimeTable;
