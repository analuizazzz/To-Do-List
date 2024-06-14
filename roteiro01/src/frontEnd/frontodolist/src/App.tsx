import React, { useState } from 'react';
import TaskBoard from './components/TaskBoard';
import IconButton from './components/IconButton';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ModalAddTask from './components/ModalAddTask';
import { Task } from './interfaces/Task';
import './App.css';

const App: React.FC = () => {
  const [openTasks, setOpenTasks] = useState<Task[]>([
    { id: 1, title: 'TASK 01', description: '', completed: false, dueDate: '', dueDays: '', taskType: '', priority: '' },
    { id: 2, title: 'TASK 02', description: '', completed: false, dueDate: '', dueDays: '', taskType: '', priority: '' },
    { id: 3, title: 'TASK 03', description: '', completed: false, dueDate: '', dueDays: '', taskType: '', priority: '' },
    { id: 4, title: 'TASK 04', description: '', completed: false, dueDate: '', dueDays: '', taskType: '', priority: '' }
  ]);

  const [closedTasks, setClosedTasks] = useState<Task[]>([
    { id: 5, title: 'TASK 05', description: '', completed: true, dueDate: '', dueDays: '', taskType: '', priority: '' },
    { id: 6, title: 'TASK 06', description: '', completed: true, dueDate: '', dueDays: '', taskType: '', priority: '' }
  ]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(true);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    let updatedOpenTasks = [...openTasks];
    let updatedClosedTasks = [...closedTasks];

    if (source.droppableId === 'open' && destination.droppableId === 'open') {
      const [movedTask] = updatedOpenTasks.splice(source.index, 1);
      updatedOpenTasks.splice(destination.index, 0, movedTask);
    } else if (source.droppableId === 'closed' && destination.droppableId === 'closed') {
      const [movedTask] = updatedClosedTasks.splice(source.index, 1);
      updatedClosedTasks.splice(destination.index, 0, movedTask);
    } else if (source.droppableId === 'open' && destination.droppableId === 'closed') {
      const [movedTask] = updatedOpenTasks.splice(source.index, 1);
      movedTask.completed = true; // Update status to closed
      updatedClosedTasks.splice(destination.index, 0, movedTask);
    } else if (source.droppableId === 'closed' && destination.droppableId === 'open') {
      const [movedTask] = updatedClosedTasks.splice(source.index, 1);
      movedTask.completed = false; // Update status to open
      updatedOpenTasks.splice(destination.index, 0, movedTask);
    }

    setOpenTasks(updatedOpenTasks);
    setClosedTasks(updatedClosedTasks);
  };

  const openAddTaskModal = () => {
    setEditingTask(null);
    setIsAdding(true);
    setIsModalVisible(true);
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsAdding(false);
    setIsModalVisible(true);
  };

  const handleSaveTask = (task: Task) => {
    if (isAdding) {
      task.completed = false; // Default status for new tasks
      setOpenTasks([...openTasks, task]);
    } else {
      if (!task.completed) {
        setOpenTasks(openTasks.map(t => (t.id === task.id ? task : t)));
      } else {
        setClosedTasks(closedTasks.map(t => (t.id === task.id ? task : t)));
      }
    }
    setIsModalVisible(false);
  };

  const resetEditing = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TO DO LIST</h1>
        <div className="icon-buttons">
          <IconButton icon="+" label="Add Task" onClick={openAddTaskModal} />
          <IconButton icon="🗑️" label="Delete Task" />
        </div>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="App-main">
          <TaskBoard title="OPEN" tasks={openTasks} droppableId="open" onEditTask={openEditTaskModal} />
          <TaskBoard title="CLOSED" tasks={closedTasks} droppableId="closed" onEditTask={openEditTaskModal} />
        </main>
      </DragDropContext>
      <ModalAddTask
        resetEditing={resetEditing}
        task={editingTask}
        add={isAdding}
        visible={isModalVisible}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default App;
