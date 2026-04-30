import React from 'react';
import { IoSunny, IoMoon, IoLogOut, IoSearch, IoGrid, IoList } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Header = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  showTrash,
  onToggleTrash,
}) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Smart Notes
          </h1>
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
            >
              <IoGrid />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
            >
              <IoList />
            </Button>
          </div>

          <Button
            variant={showTrash ? 'danger' : 'ghost'}
            size="sm"
            onClick={onToggleTrash}
          >
            {showTrash ? 'Show Notes' : 'Show Trash'}
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <IoSunny /> : <IoMoon />}
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {user?.name}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <IoLogOut />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;