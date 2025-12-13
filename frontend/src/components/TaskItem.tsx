'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Task, Priority, RepeatInterval } from '../services/types';
import { updateTask, deleteTask, toggleTaskCompletion } from '../services/api';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [editedPriority, setEditedPriority] = useState<Priority | ''>(task.priority || '');
  const [error, setError] = useState('');

  const handleToggleCompletion = async () => {
    if (!token) return;
    try {
      await toggleTaskCompletion(token, task.id);
      onTaskUpdated();
    } catch (err: any) {
      console.error('Failed to toggle task completion:', err);
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(token, task.id);
      onTaskDeleted();
    } catch (err: any) {
      console.error('Failed to delete task:', err);
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleSaveEdit = async () => {
    if (!token) return;
    setError('');
    
    try {
      await updateTask(token, task.id, {
        title: editedTitle,
        description: editedDescription || undefined,
        priority: editedPriority || undefined,
      });
      setIsEditing(false);
      onTaskUpdated();
    } catch (err: any) {
      console.error('Failed to update task:', err);
      setError(err.message || 'Failed to update task');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setEditedPriority(task.priority || '');
    setError('');
  };

  if (isEditing) {
    return (
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg">
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 backdrop-blur-sm mb-4">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
            placeholder="Task title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all resize-none"
            placeholder="Description"
            rows={2}
          />
          <select
            value={editedPriority}
            onChange={(e) => setEditedPriority(e.target.value as Priority)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
          >
            <option value="" className="bg-slate-900">Priority (None)</option>
            <option value={Priority.LOW} className="bg-slate-900">Low</option>
            <option value={Priority.MEDIUM} className="bg-slate-900">Medium</option>
            <option value={Priority.HIGH} className="bg-slate-900">High</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold rounded-lg transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg hover:bg-white/[0.07] transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h3 className={`text-lg font-semibold mb-1 ${task.is_completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-400 mb-2">{task.description}</p>
        )}
        <div className="flex flex-wrap gap-2 items-center">
          {task.priority && (
            <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
              task.priority === Priority.HIGH ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
              task.priority === Priority.MEDIUM ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
              'bg-green-500/20 text-green-300 border border-green-500/30'
            }`}>
              {task.priority}
            </span>
          )}
          {task.due_date && (
            <span className="inline-block px-3 py-1 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-full">
              📅 {new Date(task.due_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggleCompletion}
            className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-gradient-to-r checked:from-cyan-500 checked:to-blue-600 focus:ring-2 focus:ring-cyan-500/50 transition-all cursor-pointer"
          />
        </label>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 text-yellow-300 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
        >
          Delete
        </button>
      </div>
      {error && (
        <div className="w-full p-3 rounded-lg bg-red-500/10 border border-red-500/50 backdrop-blur-sm">
          <p className="text-red-300 text-sm text-center">{error}</p>
        </div>
      )}
     </div>
  );
}
