// TaskCard.tsx
import React from 'react';
import { Task as TaskType } from '../interfaces/Task';
import { Badge, Card, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface TaskCardProps {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onDelete: (task: TaskType) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const getStatusBadge = () => {
    if (task.taskType === 'DATA') {
      return (
        <Tag color='magenta'>Data Final: {task.dueDate}</Tag>
      );
    }
    if (task.taskType === 'PRAZO') {
      return (
        <Tag color='magenta'>Dias para término: {task.dueDays}</Tag>
      );
    }
  };

  return (
    <Badge.Ribbon text={task.taskType} color='pink'>
      <Card size='small' className='task-card'>
        <div className="task-content">
          <Badge count={task.id} style={{ backgroundColor: '#52c41a', margin: 10 }} />
          <div className="task-title">
            {task.title}
            <div className="task-tags">
              <Tag color='purple'>{task.priority}</Tag> 
              <Tag color='blue'>{task.status}</Tag> 
            </div>
          </div>
          <div className="ribbon-container">
            <div className="badges">
              {getStatusBadge()}
            </div>
            <div className="task-buttons">
              <EditOutlined onClick={() => onEdit(task)} style={{ padding: 10 }} />
              <DeleteOutlined onClick={() => onDelete(task)} style={{ padding: 10 }} />
            </div>
          </div>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default TaskCard;
