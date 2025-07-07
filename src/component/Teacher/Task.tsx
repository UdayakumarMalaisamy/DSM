import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

export interface TaskProps {
  userRole: "student" | "teacher";
  tasks: TaskItem[];
  setTasks: (tasks: TaskItem[]) => void;
}

const Tasks: React.FC<TaskProps> = ({ userRole, tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const handleAddTask = () => {
    const newItem: TaskItem = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
    };
    setTasks([...tasks, newItem]);
    setNewTask({ title: "", description: "", dueDate: "" });
  };

  return (
    <div className="space-y-4">
      {userRole === "teacher" && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Task</CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle>{userRole === "teacher" ? "Assigned Tasks" : "My Assignments"}</CardTitle>
        </CardHeader>
        <CardContent>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks available.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
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
    </div>
  );
};

export default Tasks;
