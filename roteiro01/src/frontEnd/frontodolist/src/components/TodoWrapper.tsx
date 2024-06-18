import React, { useState } from 'react';
import TaskBoard from './TaskBoard';
import IconButton from './IconButton';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ModalAddTask from './ModalAddTask';
import { Task } from '../interfaces/Task';
import ModalDeleteTask from './ModalDeleteTask';
import ModalDeleteAllTasks from './ModalDeleteAllTasks';
import { DeleteFilled, PlusCircleFilled  } from '@ant-design/icons';


export const TodoWrapper = () => {
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
      const [isDeleteModalVisible, setIsDeleteModalVisible] = useState<boolean>(false);
      const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
      const [isDeleteAllModalVisible, setIsDeleteAllModalVisible] = useState<boolean>(false);
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
          movedTask.completed = true; 
          updatedClosedTasks.splice(destination.index, 0, movedTask);
        } else if (source.droppableId === 'closed' && destination.droppableId === 'open') {
          const [movedTask] = updatedClosedTasks.splice(source.index, 1);
          movedTask.completed = false; 
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
    
      const openDeleteTaskModal = (task: Task) => {
        setTaskToDelete(task);
        setIsDeleteModalVisible(true);
      };
    
      const openDeleteAllTasksModal = () => {
        setIsDeleteAllModalVisible(true);
      };
    
      const handleSaveTask = (task: Task) => {
        if (isAdding) {
          task.completed = false; 
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
    
      const handleDeleteTask = (task: Task) => {
        setOpenTasks(openTasks.filter(t => t.id !== task.id));
        setClosedTasks(closedTasks.filter(t => t.id !== task.id));
        setIsDeleteModalVisible(false);
      };
    
      const handleDeleteAllTasks = () => {
        setOpenTasks([]);
        setClosedTasks([]);
        setIsDeleteAllModalVisible(false);
      };
    
      const resetEditing = () => {
        setIsModalVisible(false);
        setEditingTask(null);
      };
    
      const resetDelete = () => {
        setIsDeleteModalVisible(false);
        setTaskToDelete(null);
      };
    
      const resetDeleteAll = () => {
        setIsDeleteAllModalVisible(false);
      };
    
      return (
        <div className="App">
          <header className="App-header">
            <h1>TO DO LIST</h1>
            <div className="icon-buttons">
              <PlusCircleFilled label="Add Task" onClick={openAddTaskModal} style={{fontSize:25}}/>
              <DeleteFilled label="Delete Task" onClick={openDeleteAllTasksModal} style={{fontSize:25}}/>
            </div>
          </header>
          <DragDropContext onDragEnd={onDragEnd}>
            <main className="App-main">
              <TaskBoard title="OPEN" tasks={openTasks} droppableId="open" onEditTask={openEditTaskModal} onDeleteTask={openDeleteTaskModal} />
              <TaskBoard title="CLOSED" tasks={closedTasks} droppableId="closed" onEditTask={openEditTaskModal} onDeleteTask={openDeleteTaskModal} />
            </main>
          </DragDropContext>
          <ModalAddTask
            resetEditing={resetEditing}
            task={editingTask}
            add={isAdding}
            visible={isModalVisible}
            onSave={handleSaveTask}
          />
          <ModalDeleteTask
            visible={isDeleteModalVisible}
            task={taskToDelete}
            onDelete={handleDeleteTask}
            onCancel={resetDelete}
          />
           <ModalDeleteAllTasks
            visible={isDeleteAllModalVisible}
            onDeleteAll={handleDeleteAllTasks}
            onCancel={resetDeleteAll}
          />
        </div>
      );
}
