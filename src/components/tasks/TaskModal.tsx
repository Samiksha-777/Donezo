import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Task, Priority } from '../../types';
import { Calendar, Flag, X } from 'lucide-react';
import Button from '../ui/Button';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task }) => {
  const { addTask, updateTask, projects, tags } = useTaskContext();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [projectId, setProjectId] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setPriority(task.priority);
      setProjectId(task.projectId || '');
      setSelectedTags(task.tags || []);
    } else {
      // Default values for new task
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('medium');
      setProjectId(projects[0]?.id || '');
      setSelectedTags([]);
    }
  }, [task, projects]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      title,
      description: description || undefined,
      completed: task ? task.completed : false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority,
      projectId: projectId || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    };
    
    if (task) {
      updateTask({ ...taskData, id: task.id, createdAt: task.createdAt });
    } else {
      addTask(taskData);
    }
    
    onClose();
  };
  
  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };
  
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#10B981';
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex justify-between items-start p-4 border-b border-gray-700">
            <h3 className="text-lg font-medium text-white">
              {task ? 'Edit Task' : 'Add New Task'}
            </h3>
            <button
              className="text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description"
                />
              </div>
              
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300">
                    Due Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dueDate"
                      className="block w-full pl-10 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="w-1/2">
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-300">
                    Priority
                  </label>
                  <div className="mt-1 flex space-x-2">
                    {(['low', 'medium', 'high'] as Priority[]).map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`flex-1 py-2 px-3 rounded border ${
                          priority === p
                            ? 'bg-gray-700 border-gray-500'
                            : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                        }`}
                        onClick={() => setPriority(p)}
                      >
                        <div className="flex items-center justify-center">
                          <Flag size={14} style={{ color: getPriorityColor(p) }} className="mr-1" />
                          <span className="capitalize text-sm text-white">
                            {p}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-300">
                  Project
                </label>
                <select
                  id="project"
                  className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                >
                  <option value="">None</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <span className="block text-sm font-medium text-gray-300 mb-2">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium
                        ${selectedTags.includes(tag.id)
                          ? `bg-opacity-40 bg-gray-700`
                          : 'bg-gray-800 hover:bg-gray-700'}
                      `}
                      style={{
                        backgroundColor: selectedTags.includes(tag.id) ? `${tag.color}30` : '',
                        color: selectedTags.includes(tag.id) ? tag.color : 'white',
                        borderWidth: '1px',
                        borderColor: selectedTags.includes(tag.id) ? tag.color : 'transparent',
                      }}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-900 flex justify-end space-x-3">
              <Button 
                variant="ghost" 
                onClick={onClose} 
                type="button"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
              >
                {task ? 'Update Task' : 'Add Task'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;