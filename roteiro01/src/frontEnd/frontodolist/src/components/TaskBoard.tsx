import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './Task';
import { Task as TaskType } from '../interfaces/Task';

interface TaskBoardProps {
  title: string;
  tasks: TaskType[];
  droppableId: string;
  onEditTask: (task: TaskType) => void;
  onDeleteTask: (task: TaskType) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ title, tasks, droppableId, onEditTask, onDeleteTask }) => {
  return (
    <div className={`task-board ${title.toLowerCase()}`}>
      <h2>{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="task-list">
            {tasks.map((task, index) => (
              <Draggable key={task.id!.toString()} draggableId={task.id!.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={task} onEdit={() => onEditTask(task)} onDelete={() => onDeleteTask(task)} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskBoard;
