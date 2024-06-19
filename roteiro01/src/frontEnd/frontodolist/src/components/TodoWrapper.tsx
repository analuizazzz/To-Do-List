import React, { useEffect, useState } from 'react';
import TaskBoard from './TaskBoard';
import IconButton from './IconButton';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ModalAddTask from './ModalAddTask';
import ModalDeleteTask from './ModalDeleteTask';
import ModalDeleteAllTasks from './ModalDeleteAllTasks';
import { Task } from '../interfaces/Task';
import { fetchTasks, createTask, updateTask, deleteTask, deleteAllTasks } from '../api/api';

export const TodoWrapper: React.FC = () => {
  const [openTasks, setOpenTasks] = useState<Task[]>([]);
  const [closedTasks, setClosedTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isDeleteAllModalVisible, setIsDeleteAllModalVisible] = useState<boolean>(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      const tasks = response.data;
      setOpenTasks(tasks.filter((task: { completed: any; }) => !task.completed));
      setClosedTasks(tasks.filter((task: { completed: any; }) => task.completed));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleSaveTask = async (task: Task) => {
    try {
      if (isAdding) {
        const response = await createTask(task);
        setOpenTasks([...openTasks, response.data]);
      } else {
        if (task.id !== undefined) {
          const response = await updateTask(task.id, task);
          const updatedTask = response.data;
          if (!updatedTask.completed) {
            setOpenTasks(openTasks.map(t => (t.id === task.id ? updatedTask : t)));
          } else {
            setClosedTasks(closedTasks.map(t => (t.id === task.id ? updatedTask : t)));
          }
        }
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      if (task.id !== undefined) {
        await deleteTask(task.id);
        setOpenTasks(openTasks.filter(t => t.id !== task.id));
        setClosedTasks(closedTasks.filter(t => t.id !== task.id));
      }
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await deleteAllTasks();
      setOpenTasks([]);
      setClosedTasks([]);
      setIsDeleteAllModalVisible(false);
    } catch (error) {
      console.error('Failed to delete all tasks:', error);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    let draggedTask: Task;

    if (source.droppableId === 'open') {
      draggedTask = openTasks[source.index];
      const newOpenTasks = Array.from(openTasks);
      newOpenTasks.splice(source.index, 1);
      if (destination.droppableId === 'closed') {
        draggedTask.completed = true;
        const newClosedTasks = Array.from(closedTasks);
        newClosedTasks.splice(destination.index, 0, draggedTask);
        setClosedTasks(newClosedTasks);
      } else {
        newOpenTasks.splice(destination.index, 0, draggedTask);
      }
      setOpenTasks(newOpenTasks);
    } else {
      draggedTask = closedTasks[source.index];
      const newClosedTasks = Array.from(closedTasks);
      newClosedTasks.splice(source.index, 1);
      if (destination.droppableId === 'open') {
        draggedTask.completed = false;
        const newOpenTasks = Array.from(openTasks);
        newOpenTasks.splice(destination.index, 0, draggedTask);
        setOpenTasks(newOpenTasks);
      } else {
        newClosedTasks.splice(destination.index, 0, draggedTask);
      }
      setClosedTasks(newClosedTasks);
    }

    if (draggedTask.id !== undefined) {
      try {
        await updateTask(draggedTask.id, draggedTask);
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }
  };

  const openEditTaskModal = (task: Task) => {
    setEditingTask(task);
    setIsAdding(false);
    setIsModalVisible(true);
  };

  const openDeleteTaskModal = (task: Task) => {
    setTaskToDelete(task);
    setIsDeleteModalVisible(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TO DO LIST</h1>
        <div className="icon-buttons">
          <IconButton icon="+" label="Add Task" onClick={() => { setIsAdding(true); setIsModalVisible(true); }} />
          <IconButton icon="🗑️" label="Delete Task" onClick={() => setIsDeleteAllModalVisible(true)} />
        </div>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="App-main">
          <TaskBoard title="OPEN" tasks={openTasks} droppableId="open" onEditTask={openEditTaskModal} onDeleteTask={openDeleteTaskModal} />
          <TaskBoard title="CLOSED" tasks={closedTasks} droppableId="closed" onEditTask={openEditTaskModal} onDeleteTask={openDeleteTaskModal} />
        </main>
      </DragDropContext>
      <ModalAddTask
        resetEditing={() => setIsModalVisible(false)}
        task={editingTask}
        add={isAdding}
        visible={isModalVisible}
        onSave={handleSaveTask}
      />
      <ModalDeleteTask
        visible={isDeleteModalVisible}
        task={taskToDelete}
        onDelete={handleDeleteTask}
        onCancel={() => setIsDeleteModalVisible(false)}
      />
      <ModalDeleteAllTasks
        visible={isDeleteAllModalVisible}
        onDeleteAll={handleDeleteAllTasks}
        onCancel={() => setIsDeleteAllModalVisible(false)}
      />
    </div>
  );
};
