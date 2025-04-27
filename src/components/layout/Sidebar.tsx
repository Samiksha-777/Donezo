import React from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Calendar, CheckCircle, Clock, Home, List, Plus, Tag } from 'lucide-react';
import Button from '../ui/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { projects, tags, setCurrentFilter, currentFilter } = useTaskContext();

  const handleFilterClick = (filter: string) => {
    setCurrentFilter(filter);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-white mb-8">Donezo</h1>
          
          <Button 
            variant="primary" 
            fullWidth 
            className="mb-6"
            icon={<Plus size={16} />}
          >
            Add Task
          </Button>
          
          <nav className="space-y-1">
            <SidebarItem 
              icon={<Home size={18} />} 
              text="All Tasks" 
              onClick={() => handleFilterClick('all')}
              active={currentFilter === 'all'}
            />
            <SidebarItem 
              icon={<Calendar size={18} />} 
              text="Today" 
              onClick={() => handleFilterClick('today')}
              active={currentFilter === 'today'}
            />
            <SidebarItem 
              icon={<Clock size={18} />} 
              text="Upcoming" 
              onClick={() => handleFilterClick('upcoming')}
              active={currentFilter === 'upcoming'}
            />
            <SidebarItem 
              icon={<CheckCircle size={18} />} 
              text="Completed" 
              onClick={() => handleFilterClick('completed')}
              active={currentFilter === 'completed'}
            />
          </nav>
          
          <div className="mt-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Projects
            </h2>
            <div className="space-y-1">
              {projects.map(project => (
                <SidebarItem 
                  key={project.id}
                  icon={<List size={18} />}
                  text={project.name}
                  color={project.color}
                  onClick={() => handleFilterClick(`project:${project.id}`)}
                  active={currentFilter === `project:${project.id}`}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Tags
            </h2>
            <div className="space-y-1">
              {tags.map(tag => (
                <SidebarItem 
                  key={tag.id}
                  icon={<Tag size={18} />}
                  text={tag.name}
                  color={tag.color}
                  onClick={() => handleFilterClick(`tag:${tag.id}`)}
                  active={currentFilter === `tag:${tag.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  color?: string;
  onClick: () => void;
  active: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, text, color, onClick, active 
}) => {
  return (
    <div
      className={`flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors 
        ${active 
          ? 'bg-gray-800 text-white' 
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
      onClick={onClick}
    >
      <div className="mr-3 text-gray-400" style={color ? { color } : {}}>
        {icon}
      </div>
      <span>{text}</span>
      {color && (
        <span
          className="h-2 w-2 rounded-full ml-auto"
          style={{ backgroundColor: color }}
        />
      )}
    </div>
  );
};

export default Sidebar;