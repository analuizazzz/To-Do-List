import React from 'react';
import TaskBoard from './components/TaskBoard';
import './App.css';
import IconButton from './components/IconButton';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TO DO LIST</h1>
        <div className="icon-buttons">
          <IconButton icon="+" label="Add Task" />
          <IconButton icon="🗑️" label="Delete Task" />
        </div>
      </header>
      <main className="App-main">
        <TaskBoard title="OPEN" tasks={['TASK 01', 'TASK 02', 'TASK 01', 'TASK 01']} />
        <TaskBoard title="CLOSED" tasks={['TASK 01', 'TASK 02', 'TASK 01', 'TASK 01']} />
      </main>
    </div>
  );
};

export default App;
