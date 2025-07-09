// ✅ src/pages/teacher/TaskPage.tsx
import React, { useState } from "react";
import Students, { type ColumnConfig } from "../component/Teacher/Student";

interface Task {
  title: string;
  description: string;
  dueDate: string;
  class: string;
}

const classList = [
  "I-CS", "II-CS", "III-CS",
  "I-BCA", "II-BCA", "III-BCA",
  "I-IT", "II-IT", "III-IT",
];

const taskColumns: ColumnConfig<Task>[] = [
  { label: "Title", key: "title" },
  { label: "Description", key: "description" },
  { label: "Due Date", key: "dueDate" },
  { label: "Class", key: "class" },
];

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");

  const filteredTasks = tasks.filter((t) => t.class === selectedClass);

  const handleTaskChange = (updated: Task[]) => {
    const otherTasks = tasks.filter((t) => t.class !== selectedClass);
    const newTasks = updated.map((t) => ({ ...t, class: selectedClass }));
    setTasks([...otherTasks, ...newTasks]);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📝 Class-wise Task Management</h1>

      <div className="space-y-1">
        <label className="text-lg font-medium text-gray-700">Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full max-w-md shadow-sm"
        >
          <option value="">-- Choose a Class --</option>
          {classList.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {!selectedClass ? (
        <div className="p-4 text-gray-600 italic bg-gray-100 rounded-lg border border-dashed">
          👉 Please select a class to manage its tasks.
        </div>
      ) : (
        <Students
          data={filteredTasks}
          columns={taskColumns}
          userRole="teacher"
          entityName={`Task for ${selectedClass}`}
          onChange={handleTaskChange}
        />
      )}
    </div>
  );
};

export default TaskPage;
