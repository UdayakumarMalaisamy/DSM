import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  class: string; // ✅ Added class field
}

export interface TaskProps {
  userRole: "student" | "teacher";
  tasks: TaskItem[];
  setTasks: (tasks: TaskItem[]) => void;
  classList: string[]; // ✅ New prop to provide available classes
}

const Tasks: React.FC<TaskProps> = ({ userRole, tasks, setTasks, classList }) => {
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleAddTask = () => {
    if (!selectedClass) return alert("Please select a class");

    const newItem: TaskItem = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      class: selectedClass,
    };

    setTasks([...tasks, newItem]);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  const filteredTasks = selectedClass
    ? tasks.filter((task) => task.class === selectedClass)
    : [];

  return (
    <div className="space-y-4">
      {/* Class Selector */}
      <div className="space-y-2">
        <label className="font-semibold">Select Class</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-sm"
        >
          <option value="">-- Select Class --</option>
          {classList.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {userRole === "teacher" && selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle>Create Task for {selectedClass}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </CardContent>
        </Card>
      )}

      {selectedClass && (
        <Card>
          <CardHeader>
            <CardTitle>
              {userRole === "teacher" ? `Tasks for ${selectedClass}` : "My Assignments"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTasks.length === 0 ? (
              <p className="text-gray-500">No tasks available for this class.</p>
            ) : (
              <ul className="space-y-2">
                {filteredTasks.map((task) => (
                  <li key={task.id} className="border p-3 rounded-md">
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Tasks;
