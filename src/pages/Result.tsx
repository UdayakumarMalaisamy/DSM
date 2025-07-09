import React, { useState, useRef, useEffect } from "react";
import Students, { type ColumnConfig } from "../component/Teacher/Student";

// Types
interface Result {
  studentName: string;
  reg_number: string;
  class: string;
  mark: string;
  taskTitle: string;
}

interface Task {
  title: string;
}

const predefinedClasses = [
  "I-CS", "II-CS", "III-CS",
  "I-BCA", "II-BCA", "III-BCA",
  "I-IT", "II-IT", "III-IT",
];

const resultColumns: ColumnConfig<Result>[] = [
  { label: "Student Name", key: "studentName" },
  { label: "Register Number", key: "reg_number" },
  { label: "Class", key: "class" },
  { label: "Mark", key: "mark" },
];

const ResultPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { title: "Test" },
    { title: "Assignment" },
    { title: "Project Work" },
  ]);

  const [selectedTask, setSelectedTask] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTaskIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTaskIndex]);

  const filteredResults = results.filter(
    (r) => r.taskTitle === selectedTask && r.class === selectedClass
  );

  const handleResultsChange = (newResults: Result[]) => {
    const otherResults = results.filter(
      (r) => !(r.taskTitle === selectedTask && r.class === selectedClass)
    );
    const updated = [
      ...otherResults,
      ...newResults.map((r) => ({
        ...r,
        taskTitle: selectedTask,
        class: selectedClass,
      })),
    ];
    setResults(updated);
  };

  const handleSaveTask = () => {
    if (!newTaskTitle.trim()) return;
    if (editingTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingTaskIndex].title = newTaskTitle;
      setTasks(updatedTasks);
      if (selectedTask === tasks[editingTaskIndex].title) {
        setSelectedTask(newTaskTitle);
      }
    } else {
      setTasks([...tasks, { title: newTaskTitle }]);
    }
    setNewTaskTitle("");
    setEditingTaskIndex(null);
  };

  const handleEditTask = (index: number) => {
    setNewTaskTitle(tasks[index].title);
    setEditingTaskIndex(index);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📋 Task-Wise Student Results</h1>

      {/* Task Management */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold text-indigo-700">📝 Manage Tasks</h2>
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task name (e.g. Unit Test 2)"
            className="border px-3 py-2 rounded w-full shadow-sm"
          />
          <button
            onClick={handleSaveTask}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            {editingTaskIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Task selection buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tasks.map((task, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-lg border shadow-sm transition text-sm ${
                task.title === selectedTask
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedTask(task.title)}
              onDoubleClick={() => handleEditTask(idx)}
              title="Double-click to edit"
            >
              ✏️ {task.title}
            </button>
          ))}
        </div>
      </div>

      {/* Class Selector */}
      <div className="space-y-1">
        <label className="text-lg font-medium text-gray-700">🏫 Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full shadow-sm focus:ring-indigo-500"
        >
          <option value="">-- Choose a Class --</option>
          {predefinedClasses.map((cls, idx) => (
            <option key={idx} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Results Table */}
      {!selectedTask || !selectedClass ? (
        <div className="p-4 text-gray-600 italic bg-yellow-50 rounded-lg border border-dashed">
          👉 Please select both a task and class to enter/view results.
        </div>
      ) : (
        <Students
          data={filteredResults}
          columns={resultColumns}
          userRole="teacher"
          entityName={`Results for "${selectedTask}" - ${selectedClass}`}
          onChange={handleResultsChange}
        />
      )}
    </div>
  );
};

export default ResultPage;
