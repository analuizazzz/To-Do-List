import React from 'react';
import { Modal, Button } from 'antd';
import { Task } from '../interfaces/Task';

interface ModalDeleteTaskProps {
  visible: boolean;
  task: Task | null;
  onDelete: (task: Task) => void;
  onCancel: () => void;
}

const ModalDeleteTask: React.FC<ModalDeleteTaskProps> = ({ visible, task, onDelete, onCancel }) => {
  const handleOk = () => {
    if (task) {
      onDelete(task);
    }
  };

  return (
    <Modal
      title="Deletar Tarefa"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={handleOk}>
          Delete
        </Button>
      ]}
    >
      <p>Tem certeza que deseja deletar essa tarefa?</p>
      <p><strong>{task?.title}</strong></p>
    </Modal>
  );
};

export default ModalDeleteTask;
