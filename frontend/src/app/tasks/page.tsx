'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import AddTaskForm from '../../components/AddTaskForm';
import TaskList from '../../components/TaskList';
import SearchTasks from '../../components/SearchTasks';
import FilterTasks from '../../components/FilterTasks';
import SortTasks from '../../components/SortTasks';
import { Task, Priority } from '../../services/types';
import { fetchTasks } from '../../services/api';

export default function TasksPage() {
  const { token, user, logout } = useAuth();
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
    }
  }, [token, searchQuery, filterStatus, filterPriority, filterTag, sortBy, sortOrder]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      getTasks();
    }
  }, [token, router, getTasks]);

  const handleTaskAdded = () => {
    console.log("Task added, refreshing list");
    getTasks();
  };

  const handleTaskUpdated = () => {
    console.log("Task updated, refreshing list");
    getTasks();
  };

  const handleTaskDeleted = () => {
    console.log("Task deleted, refreshing list");
    getTasks();
  };

  if (!token) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <div className="relative min-h-screen flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user?.name ? `Welcome, ${user.name}` : 'Your Tasks'}
              </h1>
              <p className="text-gray-400 mt-2">Manage and organize your workflow</p>
            </div>
            <button 
              onClick={logout} 
              className="px-4 py-2 bg-red-500/80 hover:bg-red-600 backdrop-blur-sm text-white rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50"
            >
              Logout
            </button>
          </div>

          <div className="mb-8 w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Add New Task</h2>
            <AddTaskForm onTaskAdded={handleTaskAdded} />
          </div>

          <div className="mb-8 w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <SearchTasks searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <SortTasks sortBy={sortBy} setSortBy={setSortBy} sortOrder={sortOrder} setSortOrder={setSortOrder} />
              </div>
              <FilterTasks
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
                filterTag={filterTag}
                setFilterTag={setFilterTag}
              />
            </div>
          </div>

          <div className="w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Task List</h2>
            <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} />
          </div>
        </div>
      </div>
      
      {/* Add animations */}
      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}