'use client';

import { Task } from '../services/types'; // Will create this type later

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }: TaskItemProps) {
  return (
    <div key={task.id} className="p-4 border rounded-md shadow-sm flex items-center justify-between bg-white text-black">
      <div>
        <h3 className={`text-lg font-semibold ${task.is_completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {/* Placeholder for actions */}
        <input 
          type="checkbox" 
          checked={task.is_completed} 
          onChange={() => console.log('Toggle completion')}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <button 
          onClick={() => console.log('Edit task')} 
          className="p-2 bg-yellow-500 text-white rounded-md text-sm"
        >
          Edit
        </button>
        <button 
          onClick={() => console.log('Delete task')} 
          className="p-2 bg-red-500 text-white rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
