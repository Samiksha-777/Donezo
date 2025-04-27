import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../types';
import Badge from '../ui/Badge';
import { Calendar, CheckCircle, Circle, Edit, Flag, Trash } from 'lucide-react';
import Button from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { toggleTaskCompletion, deleteTask, getProjectById, getTagById } = useTaskContext();
  const [showActions, setShowActions] = useState(false);

  const project = task.projectId ? getProjectById(task.projectId) : undefined;
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#10B981';
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleTaskCompletion(task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEdit = () => {
    onEdit(task);
  };

  const dueDateColor = () => {
    if (!task.dueDate) return '';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    if (dueDate.getTime() < today.getTime()) {
      return 'text-red-500';
    }
    
    if (dueDate.getTime() === today.getTime()) {
      return 'text-yellow-500';
    }
    
    return 'text-gray-400';
  };

  return (
    <div 
      className={`p-4 mb-2 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-750 transition-all cursor-pointer ${
        task.completed ? 'opacity-60' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={handleEdit}
    >
      <div className="flex items-start">
        <button
          className="mr-3 mt-1 focus:outline-none"
          onClick={handleToggle}
        >
          {task.completed ? (
            <CheckCircle className="h-5 w-5 text-blue-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-500 hover:text-blue-500" />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 
              className={`text-sm font-medium ${
                task.completed ? 'line-through text-gray-400' : 'text-white'
              }`}
            >
              {task.title}
            </h3>
            
            <div className="flex items-center ml-2 space-x-1">
              {showActions && (
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 flex items-center justify-center hover:bg-gray-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit();
                    }}
                  >
                    <Edit size={14} className="text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 flex items-center justify-center hover:bg-gray-700"
                    onClick={handleDelete}
                  >
                    <Trash size={14} className="text-gray-400" />
                  </Button>
                </div>
              )}
              
              <Flag 
                size={14} 
                className="text-gray-400"
                style={{ color: getPriorityColor(task.priority) }}
              />
            </div>
          </div>
          
          {task.description && (
            <p className="mt-1 text-xs text-gray-400 line-clamp-2">{task.description}</p>
          )}
          
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {project && (
              <Badge text={project.name} color={project.color} />
            )}
            
            {task.tags?.map(tagId => {
              const tag = getTagById(tagId);
              return tag ? (
                <Badge key={tag.id} text={tag.name} color={tag.color} />
              ) : null;
            })}
            
            {task.dueDate && (
              <div className={`flex items-center text-xs ${dueDateColor()}`}>
                <Calendar size={12} className="mr-1" />
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;