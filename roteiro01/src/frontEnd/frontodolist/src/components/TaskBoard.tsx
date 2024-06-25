// TaskBoard.tsx
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

const TaskBoard: React.FC<TaskBoardProps> = ({
  title,
  tasks,
  droppableId,
  onEditTask,
  onDeleteTask,
}) => {
  return (
    <div className={`task-board ${droppableId === 'open' ? 'open-column' : 'closed-column'}`}>
      <h2 className="board-title">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="task-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <Draggable 
                key={task.id !== undefined ? task.id : `task-${index}`} 
                draggableId={task.id !== undefined ? task.id.toString() : `task-${index}`} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task
                      task={task}
                      index={index}
                      onEdit={onEditTask}
                      onDelete={onDeleteTask}
                    />
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
