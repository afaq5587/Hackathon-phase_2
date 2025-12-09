'use client';

import { useEffect, useState } from 'react'; // Added useState
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AddTaskForm from '../../components/AddTaskForm';
import TaskList from '../../components/TaskList'; // Added import
import { Task } from '../../services/types'; // Added import

export default function TasksPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]); // State for tasks

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
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Your Tasks</h1>
      <button onClick={logout} className="mb-8 p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
        Logout
      </button>

      <div className="mb-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
        <AddTaskForm onTaskAdded={handleTaskAdded} />
      </div>

      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Task List</h2>
        <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
      </div>
    </div>
  );
}
