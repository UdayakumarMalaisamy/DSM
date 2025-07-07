import React, { useState } from 'react';

interface Course {
  id: number;
  time: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

const TimetableRow: React.FC<{
  course: Course;
  onEdit: (id: number, day: string, value: string) => void;
  editing: { id: number; day: string } | null;
  editValue: string;
  setEditValue: (value: string) => void;
  onSave: (id: number, day: string) => void;
}> = ({ course, onEdit, editing, editValue, setEditValue, onSave }) => {
  const days: (keyof Course)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3 font-medium">{course.time}</td>
      {days.map(day => (
        <td key={day} className="p-3">
          {editing?.id === course.id && editing?.day === day ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border rounded p-1 text-sm w-48"
                placeholder="Enter course or event"
              />
              <button
                onClick={() => onSave(course.id, day)}
                className="bg-blue-800 text-white px-2 py-1 rounded hover:bg-blue-900 transition"
              >
                Save
              </button>
            </div>
          ) : (
            <div
              onClick={() => onEdit(course.id, day, course[day] as string)}
              className="cursor-pointer hover:bg-gray-200 p-1 rounded"
            >
              {course[day] || "–"}
            </div>
          )}
        </td>
      ))}
    </tr>
  );
};

const AddTimeSlotForm: React.FC<{ onAdd: (time: string) => void }> = ({ onAdd }) => {
  const [newTime, setNewTime] = useState<string>("");

  const handleAdd = () => {
    if (newTime.trim()) {
      onAdd(newTime);
      setNewTime("");
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)}
        placeholder="e.g., 3:00–4:00 PM"
        className="border rounded p-2 text-sm w-48"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
      >
        Add Time Slot
      </button>
    </div>
  );
};

const App: React.FC = () => {
  const [timetable, setTimetable] = useState<Course[]>([
    { id: 1, time: "9:00–10:00 AM", monday: "Foundations of CS (Lecture)", tuesday: "Data Structures (Lecture)", wednesday: "", thursday: "Algorithms (Lecture)", friday: "Operating Systems (Lecture)" },
    { id: 2, time: "10:00–11:00 AM", monday: "", tuesday: "Programming Lab (Kilburn Bldg)", wednesday: "Discrete Math (Lecture)", thursday: "", friday: "Programming Lab (Kilburn Bldg)" },
    { id: 3, time: "11:00–12:00 PM", monday: "Databases (Lecture)", tuesday: "", wednesday: "Foundations of CS (Tutorial)", thursday: "Data Structures (Tutorial)", friday: "" },
    { id: 4, time: "12:00–1:00 PM", monday: "Lunch break", tuesday: "Lunch break", wednesday: "Lunch break", thursday: "Lunch break", friday: "Lunch break" },
    { id: 5, time: "1:00–2:00 PM", monday: "Algorithms (Lecture)", tuesday: "Discrete Math (Lab)", wednesday: "", thursday: "Databases (Tutorial)", friday: "" },
    { id: 6, time: "2:00–3:00 PM", monday: "", tuesday: "", wednesday: "Operating Systems (Lecture)", thursday: "", friday: "Study Group / Office Hours" },
  ]);
  const [editing, setEditing] = useState<{ id: number; day: string } | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleEdit = (id: number, day: string, value: string) => {
    setEditing({ id, day });
    setEditValue(value);
  };

  const handleSave = (id: number, day: string) => {
    setTimetable(timetable.map(course =>
      course.id === id ? { ...course, [day]: editValue } : course
    ));
    setEditing(null);
    setEditValue("");
  };

  const handleAddTimeSlot = (time: string) => {
    const newId = Math.max(...timetable.map(c => c.id), 0) + 1;
    setTimetable([...timetable, { id: newId, time, monday: "", tuesday: "", wednesday: "", thursday: "", friday: "" }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">CS Major Timetable Admin</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Monday</th>
              <th className="p-3 text-left">Tuesday</th>
              <th className="p-3 text-left">Wednesday</th>
              <th className="p-3 text-left">Thursday</th>
              <th className="p-3 text-left">Friday</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map(course => (
              <TimetableRow
                key={course.id}
                course={course}
                onEdit={handleEdit}
                editing={editing}
                editValue={editValue}
                setEditValue={setEditValue}
                onSave={handleSave}
              />
            ))}
          </tbody>
        </table>
      </div>
      <AddTimeSlotForm onAdd={handleAddTimeSlot} />
      <p className="mt-4 text-sm text-gray-600">
        Click a cell to edit the course or event. Changes are saved locally in the browser.
      </p>
    </div>
  );
};

export default App;