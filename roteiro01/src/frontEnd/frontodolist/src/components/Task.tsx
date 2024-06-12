import React from 'react';

interface TaskProps {
  task: string;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="task">
      <span>{task}</span>
      <div className="task-icons">
        <button className="icon-button">✏️</button>
        <button className="icon-button">🗑️</button>
      </div>
    </div>
  );
};

export default Task;
