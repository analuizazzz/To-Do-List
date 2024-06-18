import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import { Task } from '../interfaces/Task';

interface ModalAddTaskProps {
  resetEditing: () => void;
  task: Task | null;
  add: boolean;
  visible: boolean;
  onSave: (task: Task) => void;
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ resetEditing, task, add, visible, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (task) {
      form.setFieldsValue(task);
    }
  }, [task, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      const newTask = task ? { ...task, ...values } : { ...values, id: Date.now(), completed: false };
      onSave(newTask);
      form.resetFields();
      resetEditing();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    resetEditing();
  };

  return (
    <Modal
      title={add ? "Add Task" : "Edit Task"}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {add ? "Add" : "Save"}
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={task || { title: '', description: '', dueDate: '', dueDays: '', taskType: '', priority: '' }}
      >
        <Form.Item
          name="title"
          label="Task Title"
          rules={[{ required: true, message: 'Please enter the task title' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="dueDays"
          label="Due Days"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="taskType"
          label="Task Type"
        >
          <Select>
            <Select.Option value="Type1">Type1</Select.Option>
            <Select.Option value="Type2">Type2</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
        >
          <Select>
            <Select.Option value="Low">Low</Select.Option>
            <Select.Option value="Medium">Medium</Select.Option>
            <Select.Option value="High">High</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddTask;
