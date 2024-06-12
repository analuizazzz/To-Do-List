import React from 'react';
import Task from './Task';

interface TaskBoardProps {
  title: string;
  tasks: string[];
}

const TaskBoard: React.FC<TaskBoardProps> = ({ title, tasks }) => {
  return (
    <div className={`task-board ${title.toLowerCase()}`}>
      <h2>{title}</h2>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
