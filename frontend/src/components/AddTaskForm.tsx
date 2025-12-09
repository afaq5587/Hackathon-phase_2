'use client';

import { useState } from 'react';
import { Priority } from '../services/types';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

export default function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [tags, setTags] = useState(''); // State for tags

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add task via API will go here
    console.log('Adding task:', { title, description, priority, tags });
    setTitle('');
    setDescription('');
    setPriority('');
    setTags('');
    onTaskAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-md shadow-md">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-black"
        required
      />
      <textarea
        placeholder="Task Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="p-2 border border-gray-300 rounded-md text-black"
      ></textarea>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        className="p-2 border border-gray-300 rounded-md text-black"
      >
        <option value="">Select Priority (Optional)</option>
        <option value={Priority.LOW}>Low</option>
        <option value={Priority.MEDIUM}>Medium</option>
        <option value={Priority.HIGH}>High</option>
      </select>
      <input
        type="text"
        placeholder="Tags (comma-separated, e.g., work, urgent)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="p-2 border border-gray-300 rounded-md text-black"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
}
