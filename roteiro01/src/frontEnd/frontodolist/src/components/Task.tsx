import React from 'react';
import { Task as TaskType } from '../interfaces/Task';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface TaskProps {
  task: TaskType;
  onEdit: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task">
      <span>{task.title}</span>
      <div className="task-actions">
        <EditOutlined onClick={onEdit} />
        <DeleteOutlined onClick={onDelete} />
      </div>
    </div>
  );
};

export default Task;
