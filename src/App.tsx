import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import TaskList from './components/tasks/TaskList';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <TaskProvider>
      <div className="flex h-screen bg-gray-900 text-white">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 overflow-y-auto">
            <TaskList />
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;