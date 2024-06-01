import React, { useState } from 'react';
import Column from './components/Column';
import TaskForm from './components/TaskForm';
import './App.css';

const App: React.FC = () => {
  const [openTasks, setOpenTasks] = useState<string[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const addTask = (task: string) => {
    setOpenTasks([...openTasks, task]);
  };

  return (
    <div className="app">
      <TaskForm addTask={addTask} />
      <div className="columns">
        <Column title="Tarefas Abertas" tasks={openTasks} />
        <Column title="Em Andamento" tasks={inProgressTasks} />
        <Column title="Concluídas" tasks={completedTasks} />
      </div>
    </div>
  );
};

export default App;
