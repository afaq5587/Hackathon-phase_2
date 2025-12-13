import React from 'react';
import { Priority } from '../services/types';

interface FilterTasksProps {
  filterStatus: boolean | '';
  setFilterStatus: (status: boolean | '') => void;
  filterPriority: Priority | '';
  setFilterPriority: (priority: Priority | '') => void;
  filterTag: string;
  setFilterTag: (tag: string) => void;
}

const FilterTasks: React.FC<FilterTasksProps> = ({
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  filterTag,
  setFilterTag,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      <select
        value={filterStatus === true ? 'completed' : filterStatus === false ? 'incomplete' : ''}
        onChange={(e) => setFilterStatus(e.target.value === 'completed' ? true : e.target.value === 'incomplete' ? false : '')}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value as Priority)}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-1/4 bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="">All Priorities</option>
        <option value={Priority.LOW}>Low</option>
        <option value={Priority.MEDIUM}>Medium</option>
        <option value={Priority.HIGH}>High</option>
      </select>
       <input
        type="text"
        placeholder="Filter by tag..."
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-1/2 bg-white dark:bg-gray-700 text-black dark:text-white"
      />
    </div>
  );
};

export default FilterTasks;
