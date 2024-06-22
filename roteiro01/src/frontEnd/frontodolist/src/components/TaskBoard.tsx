import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { Task as TaskType } from '../interfaces/Task';

interface TaskBoardProps {
  title: string;
  tasks: TaskType[];
  droppableId: string;
  onEditTask: (task: TaskType) => void;
  onDeleteTask: (task: TaskType) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({
  title = "Tasks", 
  tasks = [], 
  droppableId,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className="task-board">
      <h2>{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
            {tasks.map((task, index) => (
              <Task 
                key={task.id} 
                task={task} 
                index={index} 
                onEdit={onEditTask} 
                onDelete={onDeleteTask} 
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskBoard;
