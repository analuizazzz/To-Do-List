import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import { Task } from '../interfaces/Task';
import moment from 'moment';

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
      form.setFieldsValue({
        ...task,
        dueDate: task.dueDate ? moment(task.dueDate) : null,
        status: task.dueDays ? `Atrasado ${task.dueDays} dias` : 'No prazo',
      });
    }
  }, [task, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      const { dueDate, status, ...restValues } = values;

      const formattedDueDate = dueDate ? moment(dueDate).format('YYYY-MM-DD') : null;

      const newTask: Task = {
        ...restValues,
        dueDate: formattedDueDate,
        taskType: restValues.taskType || "LIVRE",
        priority: restValues.priority || "BAIXA",
      };

      onSave(newTask);
      form.resetFields();
      resetEditing();
      console.log(newTask);

    });
  };

  const handleCancel = () => {
    form.resetFields();
    resetEditing();
  };

  return (
    <Modal
      title={add ? "Add Task" : "Edit Task"}
      visible={visible}
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
        initialValues={task || { title: '', description: '', dueDate: null, taskType: 'LIVRE', priority: 'BAIXA', status: '' }}
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
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="taskType"
          label="Task Type"
        >
          <Select>
            <Select.Option value="DATA">DATA</Select.Option>
            <Select.Option value="PRAZO">PRAZO</Select.Option>
            <Select.Option value="LIVRE">LIVRE</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
        >
          <Select>
            <Select.Option value="BAIXA">Baixa</Select.Option>
            <Select.Option value="MEDIA">Media</Select.Option>
            <Select.Option value="ALTA">Alta</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
        >
          <Input disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddTask;
