import React from 'react';

interface SearchTasksProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchTasks: React.FC<SearchTasksProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 border border-gray-300 dark:border-gray-600 rounded-md w-full sm:w-1/2 bg-white dark:bg-gray-700 text-black dark:text-white"
    />
  );
};

export default SearchTasks;
