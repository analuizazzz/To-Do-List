import React from 'react';
import { Modal, Descriptions } from 'antd';
import { Task } from '../interfaces/Task';

interface ModalViewTaskProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
}

const ModalViewTask: React.FC<ModalViewTaskProps> = ({ visible, task, onClose }) => {
  if (!task) return null;

  return (
    <Modal open={visible} onCancel={onClose} footer={null} title="View Task">
      <Descriptions bordered>
        <Descriptions.Item label="Title">{task.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{task.description}</Descriptions.Item>
        <Descriptions.Item label="Date">{task.dueDate}</Descriptions.Item>
        <Descriptions.Item label="Completed">{task.completed ? 'Yes' : 'No'}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default ModalViewTask;
