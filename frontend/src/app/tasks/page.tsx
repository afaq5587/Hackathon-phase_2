'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AddTaskForm from '../../components/AddTaskForm';
import TaskList from '../../components/TaskList';
import { Task } from '../../services/types';

export default function TasksPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      // Fetch tasks when component mounts or token changes
      // fetchTasks();
    }
  }, [token, router]);

  const handleTaskAdded = () => {
    // Logic to refresh task list will go here
    console.log("Task added, need to refresh list");
    // fetchTasks();
  };

  const handleTaskUpdated = () => {
    console.log("Task updated, need to refresh list");
    // fetchTasks();
  };

  const handleTaskDeleted = () => {
    console.log("Task deleted, need to refresh list");
    // fetchTasks();
  };

  if (!token) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8"> {/* Added responsive padding */}
      <div className="w-full max-w-2xl"> {/* Increased max-width for better desktop use */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Your Tasks</h1>
          <button onClick={logout} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm">
            Logout
          </button>
        </div>

        <div className="mb-8 w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Add New Task</h2>
          <AddTaskForm onTaskAdded={handleTaskAdded} />
        </div>

        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Task List</h2>
          <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
        </div>
      </div>
    </div>
  );
}