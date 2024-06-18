import React from 'react';
import { Modal, Button } from 'antd';

interface ModalDeleteAllTasksProps {
  visible: boolean;
  onDeleteAll: () => void;
  onCancel: () => void;
}

const ModalDeleteAllTasks: React.FC<ModalDeleteAllTasksProps> = ({ visible, onDeleteAll, onCancel }) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onDeleteAll}>
          Delete All
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete all tasks?</p>
    </Modal>
  );
};

export default ModalDeleteAllTasks;
