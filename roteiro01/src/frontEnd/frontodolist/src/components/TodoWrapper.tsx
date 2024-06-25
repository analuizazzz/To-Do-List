import React, { useEffect, useState } from 'react';
import TaskBoard from './TaskBoard';
import IconButton from './IconButton';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ModalAddTask from './ModalAddTask';
import ModalDeleteTask from './ModalDeleteTask';
import ModalDeleteAllTasks from './ModalDeleteAllTasks';
import { Task as TaskType } from '../interfaces/Task';  
import { Input } from 'antd';
import { SearchOutlined, PlusOutlined, DeleteFilled } from '@ant-design/icons';
import TaskComponent from './Task';  
import { fetchTasks, createTask, updateTask, deleteTask, deleteAllTasks, fetchTaskById } from '../api/api';

export const TodoWrapper: React.FC = () => {
  const [openTasks, setOpenTasks] = useState<TaskType[]>([]);
  const [closedTasks, setClosedTasks] = useState<TaskType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskType | null>(null);
  const [isDeleteAllModalVisible, setIsDeleteAllModalVisible] = useState<boolean>(false);
  const [searchId, setSearchId] = useState<string>('');
  const [searchedTask, setSearchedTask] = useState<TaskType | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      const tasks = response.data;
      setOpenTasks(tasks.filter((task: TaskType) => !task.completed));
      setClosedTasks(tasks.filter((task: TaskType) => task.completed));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleSaveTask = async (task: TaskType) => {
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
      setEditingTask(null); 
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleDeleteTask = async (task: TaskType) => {
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

    let draggedTask: TaskType;
    if (source.droppableId === 'open') {
      draggedTask = openTasks[source.index];
      const newOpenTasks = Array.from(openTasks);
      newOpenTasks.splice(source.index, 1);

      if (destination.droppableId === 'closed') {
        draggedTask.completed = true;
        const newClosedTasks = Array.from(closedTasks);
        newClosedTasks.splice(destination.index, 0, draggedTask);
        setOpenTasks(newOpenTasks);
        setClosedTasks(newClosedTasks);
      } else {
        newOpenTasks.splice(destination.index, 0, draggedTask);
        setOpenTasks(newOpenTasks);
      }
    } else {
      draggedTask = closedTasks[source.index];
      const newClosedTasks = Array.from(closedTasks);
      newClosedTasks.splice(source.index, 1);

      if (destination.droppableId === 'open') {
        draggedTask.completed = false;
        const newOpenTasks = Array.from(openTasks);
        newOpenTasks.splice(destination.index, 0, draggedTask);
        setClosedTasks(newClosedTasks);
        setOpenTasks(newOpenTasks);
      } else {
        newClosedTasks.splice(destination.index, 0, draggedTask);
        setClosedTasks(newClosedTasks);
      }
    }

    try {
      if (draggedTask.id !== undefined) {
        await updateTask(draggedTask.id, draggedTask);
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const openEditTaskModal = (task: TaskType) => {
    setEditingTask(task);
    setIsAdding(false);
    setIsModalVisible(true);
  };

  const openDeleteTaskModal = (task: TaskType) => {
    setTaskToDelete(task);
    setIsDeleteModalVisible(true);
  };

  const handleSearchTask = async () => {
    if (!searchId) return;
    try {
      const response = await fetchTaskById(parseInt(searchId));
      setSearchedTask(response); 
    } catch (error) {
      console.error('Failed to fetch task by ID:', error);
      setSearchedTask(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>TO DO LIST</h1>
        <div className="icon-buttons">
          <PlusOutlined  onClick={() => { setIsAdding(true); setIsModalVisible(true); }} />
          <DeleteFilled onClick={() => setIsDeleteAllModalVisible(true)} />
        </div>
        <div className="search-task">
          <Input 
            type="text" 
            value={searchId} 
            onChange={(e) => setSearchId(e.target.value)} 
            placeholder="Search Task by ID" 
          />
          <SearchOutlined onClick={handleSearchTask} />
        </div>
      </header>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="App-main">
          {searchedTask ? (
            <div className="task-board">
              <h2>Tarefa:</h2>
              <TaskComponent 
                task={searchedTask} 
                index={0} 
                onEdit={openEditTaskModal} 
                onDelete={openDeleteTaskModal} 
              />
            </div>
          ) : (
            <>
              <TaskBoard 
                title="OPEN" 
                tasks={openTasks} 
                droppableId="open" 
                onEditTask={openEditTaskModal} 
                onDeleteTask={openDeleteTaskModal} 
              />
              <TaskBoard 
                title="CLOSED" 
                tasks={closedTasks} 
                droppableId="closed" 
                onEditTask={openEditTaskModal} 
                onDeleteTask={openDeleteTaskModal} 
              />
            </>
          )}
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

export default TodoWrapper;
