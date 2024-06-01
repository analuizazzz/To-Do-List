import React from 'react';
import Task from './Task';

interface ColumnProps {
  title: string;
  tasks: string[];
}

const Column: React.FC<ColumnProps> = ({ title, tasks }) => {
  return (
    <div className="column">
      <h2>{title}</h2>
      {tasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  );
};

export default Column;
