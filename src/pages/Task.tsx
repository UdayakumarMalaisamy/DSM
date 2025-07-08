// pages/teacher/TaskPage.tsx
import React, { useState } from "react";
import Students, { type ColumnConfig } from "../component/Teacher/Student"; // Keep name as Students

interface Task {
  title: string;
  type: string;
  subject: string;
  date: string;
}

const initialTasks: Task[] = [
  { title: "Test 1", type: "Test", subject: "Math", date: "2025-07-10" },
  { title: "Assignment 1", type: "Assignment", subject: "Science", date: "2025-07-12" },
];

const taskColumns: ColumnConfig<Task>[] = [
  { label: "Title", key: "title" },
  { label: "Type", key: "type" },
  { label: "Subject", key: "subject" },
  { label: "Date", key: "date" },
];

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  return (
    <div className="p-6">
      <Students
        data={tasks}
        columns={taskColumns}
        userRole="teacher"
        entityName="Task"
        onChange={setTasks}
      />
    </div>
  );
};

export default TaskPage;
