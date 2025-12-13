import React from 'react';

interface SortTasksProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}

const SortTasks: React.FC<SortTasksProps> = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-4 w-full sm:w-1/2">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-1/2 bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="">Sort By</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="due_date">Due Date</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-1/2 bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortTasks;
