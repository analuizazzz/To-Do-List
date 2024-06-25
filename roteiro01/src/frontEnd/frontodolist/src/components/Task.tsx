import React from 'react';
import { Task as TaskType } from '../interfaces/Task';
import TaskCard from './TaskCard';

interface TaskProps {
  task: TaskType;
  index: number;
  onEdit: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

const Task: React.FC<TaskProps> = ({ task, index, onEdit, onDelete }) => {
  return (
    <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
  );
};

export default Task;
