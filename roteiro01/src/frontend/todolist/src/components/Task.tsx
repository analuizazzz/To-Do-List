import React from 'react';

interface TaskProps {
  task: string;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="task">
      {task}
    </div>
  );
};

export default Task;
