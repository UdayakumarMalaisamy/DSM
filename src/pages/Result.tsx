// src/pages/teacher/ResultPage.tsx
import React, { useState } from "react";
import Students, { type ColumnConfig } from "../component/Teacher/Student";

// Result structure
interface Result {
  studentName: string;
  reg_number: string;
  class: string;
  mark: string;
  taskTitle: string;
}

// Available tasks (simulate for now)
const tasks = [
  { title: "Test 1" },
  { title: "Assignment 1" },
  { title: "Project Work" },
];

// Table columns
const resultColumns: ColumnConfig<Result>[] = [
  { label: "Student Name", key: "studentName" },
  { label: "Register Number", key: "reg_number" },
  { label: "Class", key: "class" },
  { label: "Mark", key: "mark" },
];

const ResultPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [selectedTask, setSelectedTask] = useState<string>("");

  const filteredResults = results.filter((r) => r.taskTitle === selectedTask);

  const handleResultsChange = (newResultsForTask: Result[]) => {
    const others = results.filter((r) => r.taskTitle !== selectedTask);
    const updated = [
      ...others,
      ...newResultsForTask.map((r) => ({ ...r, taskTitle: selectedTask })),
    ];
    setResults(updated);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📋 Enter Student Results by Task</h1>

      {/* Task Selector */}
      <div className="space-y-1">
        <label className="text-lg font-medium text-gray-700">Select Task</label>
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg w-full shadow-sm focus:ring-2 focus:ring-indigo-500"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
        >
          <option value="">-- Choose a Task --</option>
          {tasks.map((task, idx) => (
            <option key={idx} value={task.title}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {/* Results Table */}
      {!selectedTask ? (
        <div className="p-4 text-gray-600 italic bg-gray-100 rounded-lg border border-dashed">
          👉 Please select a task above to enter student results.
        </div>
      ) : (
        <Students
          data={filteredResults}
          columns={resultColumns}
          userRole="teacher"
          entityName={`Result for "${selectedTask}"`}
          onChange={handleResultsChange}
        />
      )}
    </div>
  );
};

export default ResultPage;
