import React from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Menu, Search, X } from 'lucide-react';
import Button from '../ui/Button';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { searchTerm, setSearchTerm } = useTaskContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="md:hidden mr-2" 
            onClick={toggleSidebar}
            icon={<Menu size={20} />}
          >
            <span className="sr-only">Open sidebar</span>
          </Button>
        </div>
        
        <div className="flex-1 max-w-xl mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="block w-full pl-10 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchTerm && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;