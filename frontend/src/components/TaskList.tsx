'use client';

import { Task } from '../services/types';
import TaskItem from './TaskItem'; // Added import

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: () => void;
  onTaskDeleted: () => void;
}

export default function TaskList({ tasks, onTaskUpdated, onTaskDeleted }: TaskListProps) {
  return (
    <div className="flex flex-col gap-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onTaskUpdated={onTaskUpdated} 
            onTaskDeleted={onTaskDeleted} 
          />
        ))
      )}
    </div>
  );
}
