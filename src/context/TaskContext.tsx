import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Project, Tag, Priority } from '../types';
import { sampleTasks, projects, tags, generateId } from '../utils/data';

interface TaskContextType {
  tasks: Task[];
  projects: Project[];
  tags: Tag[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  getProjectById: (id: string) => Project | undefined;
  getTagById: (id: string) => Tag | undefined;
  filteredTasks: Task[];
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  currentFilter: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(sampleTasks);
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Effect to filter tasks based on search term and current filter
  useEffect(() => {
    let filtered = [...tasks];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (currentFilter !== 'all') {
      if (currentFilter === 'today') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filtered = filtered.filter(task => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === today.getTime();
        });
      } else if (currentFilter === 'upcoming') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filtered = filtered.filter(task => {
          if (!task.dueDate) return false;
          const taskDate = new Date(task.dueDate);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() > today.getTime();
        });
      } else if (currentFilter === 'completed') {
        filtered = filtered.filter(task => task.completed);
      } else if (currentFilter.startsWith('project:')) {
        const projectId = currentFilter.split(':')[1];
        filtered = filtered.filter(task => task.projectId === projectId);
      } else if (currentFilter.startsWith('tag:')) {
        const tagId = currentFilter.split(':')[1];
        filtered = filtered.filter(task => task.tags?.includes(tagId));
      }
    }
    
    setFilteredTasks(filtered);
  }, [tasks, currentFilter, searchTerm]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const getTagById = (id: string) => {
    return tags.find(tag => tag.id === id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        projects,
        tags,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        getProjectById,
        getTagById,
        filteredTasks,
        setFilteredTasks,
        currentFilter,
        setCurrentFilter,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};