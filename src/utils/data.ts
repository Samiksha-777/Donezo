import { Project, Tag, Task } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

// Sample projects
export const projects: Project[] = [
  { id: '1', name: 'Personal', color: '#3B82F6' },
  { id: '2', name: 'Work', color: '#10B981' },
  { id: '3', name: 'Shopping', color: '#F59E0B' },
  { id: '4', name: 'Health', color: '#EF4444' },
];

// Sample tags
export const tags: Tag[] = [
  { id: '1', name: 'Important', color: '#EF4444' },
  { id: '2', name: 'Quick', color: '#F59E0B' },
  { id: '3', name: 'Long-term', color: '#3B82F6' },
  { id: '4', name: 'Recurring', color: '#10B981' },
];

// Sample tasks
export const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Donezo project',
    description: 'Finish building the task management app',
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    priority: 'high',
    projectId: '2',
    tags: ['1'],
  },
  {
    id: '2',
    title: 'Go grocery shopping',
    description: 'Buy fruits, vegetables, and milk',
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    priority: 'medium',
    projectId: '3',
    tags: ['2'],
  },
  {
    id: '3',
    title: 'Morning workout',
    description: '30 minutes of cardio and strength training',
    completed: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    priority: 'medium',
    projectId: '4',
    tags: ['4'],
  },
  {
    id: '4',
    title: 'Update resume',
    description: 'Add recent projects and update skills',
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    priority: 'low',
    projectId: '1',
    tags: ['3'],
  },
  {
    id: '5',
    title: 'Pay bills',
    description: 'Electricity, internet, and water bills',
    completed: false,
    createdAt: new Date(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    priority: 'high',
    projectId: '1',
    tags: ['1'],
  },
];