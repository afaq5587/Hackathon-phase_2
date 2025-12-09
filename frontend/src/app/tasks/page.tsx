'use client';

import { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AddTaskForm from '../../components/AddTaskForm';
import TaskList from '../../components/TaskList';
import { Task, Priority } from '../../services/types';
import { fetchTasks } from '../../services/api'; // Import fetchTasks

export default function TasksPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<boolean | ''>('');
  const [filterPriority, setFilterPriority] = useState<Priority | ''>('');
  const [filterTag, setFilterTag] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const getTasks = useCallback(async () => {
    if (!token) return;
    try {
      const fetchedTasks = await fetchTasks(token, {
        search: searchQuery || undefined,
        is_completed: filterStatus,
        priority: filterPriority,
        tag: filterTag || undefined,
        sort_by: sortBy || undefined,
        order: sortOrder as 'asc' | 'desc',
      });
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      // Handle error, e.g., show a message to the user
    }
  }, [token, searchQuery, filterStatus, filterPriority, filterTag, sortBy, sortOrder]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      getTasks();
    }
  }, [token, router, getTasks]); // getTasks is now a dependency

  const handleTaskAdded = () => {
    console.log("Task added, refreshing list");
    getTasks(); // Refresh tasks after adding
  };

  const handleTaskUpdated = () => {
    console.log("Task updated, refreshing list");
    getTasks(); // Refresh tasks after updating
  };

  const handleTaskDeleted = () => {
    console.log("Task deleted, refreshing list");
    getTasks(); // Refresh tasks after deleting
  };

  if (!token) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
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

        <div className="mb-8 w-full"> {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2 text-black"
            />
            <select
              value={filterStatus === true ? 'completed' : filterStatus === false ? 'incomplete' : ''}
              onChange={(e) => setFilterStatus(e.target.value === 'completed' ? true : e.target.value === 'incomplete' ? false : '')}
              className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4 text-black"
            >
              <option value="">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority)}
              className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4 text-black"
            >
              <option value="">All Priorities</option>
              <option value={Priority.LOW}>Low</option>
              <option value={Priority.MEDIUM}>Medium</option>
              <option value={Priority.HIGH}>High</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Filter by tag (e.g., work, personal)"
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full sm:w-1/2 text-black"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4 text-black"
            >
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full sm:w-1/4 text-black"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Task List</h2>
          <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
        </div>
      </div>
    </div>
  );
}