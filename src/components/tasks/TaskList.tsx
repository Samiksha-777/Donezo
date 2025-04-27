import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';
import { Task } from '../../types';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';

const TaskList: React.FC = () => {
  const { filteredTasks, currentFilter } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openAddTaskModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const getFilterTitle = () => {
    if (currentFilter === 'all') return 'All Tasks';
    if (currentFilter === 'today') return 'Today';
    if (currentFilter === 'upcoming') return 'Upcoming';
    if (currentFilter === 'completed') return 'Completed';
    if (currentFilter.startsWith('project:')) {
      const { projects } = useTaskContext();
      const projectId = currentFilter.split(':')[1];
      const project = projects.find(p => p.id === projectId);
      return project ? `Project: ${project.name}` : 'Project Tasks';
    }
    if (currentFilter.startsWith('tag:')) {
      const { tags } = useTaskContext();
      const tagId = currentFilter.split(':')[1];
      const tag = tags.find(t => t.id === tagId);
      return tag ? `Tag: ${tag.name}` : 'Tagged Tasks';
    }
    return 'Tasks';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">{getFilterTitle()}</h2>
        <Button
          variant="primary"
          onClick={openAddTaskModal}
          icon={<Plus size={16} />}
        >
          Add Task
        </Button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No tasks found</p>
          <Button
            variant="secondary"
            onClick={openAddTaskModal}
            icon={<Plus size={16} />}
          >
            Add your first task
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEditTask}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={closeModal}
          task={editingTask}
        />
      )}
    </div>
  );
};

export default TaskList;