import React from 'react';
import { Task as TaskType } from '../interfaces/Task';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface TaskProps {
  task: TaskType;
  index: number;
  onEdit: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

const Task: React.FC<TaskProps> = ({ task, index, onEdit, onDelete }) => {
  return (
    <div className="task">
      <span>{task.title}</span>
      <span>Status: {task.status}</span>
      <div className="task-actions">
        <EditOutlined onClick={() => onEdit(task)} />
        <DeleteOutlined onClick={() => onDelete(task)} />
      </div>
    </div>
  );
};

export default Task;
