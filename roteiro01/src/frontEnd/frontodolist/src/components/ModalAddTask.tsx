import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, DatePicker, Select } from 'antd';
import { Task } from '../interfaces/Task';
import moment, { Moment } from 'moment';

interface ModalAddTaskProps {
  resetEditing: () => void;
  task: Task | null;
  add: boolean;
  visible: boolean;
  onSave: (task: Task) => void;
}

const ModalAddTask: React.FC<ModalAddTaskProps> = ({ resetEditing, task, add, visible, onSave }) => {
  const [form] = Form.useForm();
  const [taskType, setTaskType] = useState<string>('LIVRE'); 

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        ...task,
        dueDate: task.dueDate ? moment(task.dueDate, 'YYYY-MM-DD') : null,
        dueDays: task.dueDays !== undefined ? task.dueDays.toString() : undefined,
        status: task.status || 'No prazo',
      });
      setTaskType(task.taskType || 'LIVRE');
    } else {
      form.resetFields();
      setTaskType('LIVRE'); 
    }
  }, [task, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      const { dueDate, dueDays, status, ...restValues } = values;
      

      console.log(dueDate)

      const newTask: Task = {
        ...task,
        ...restValues,
        dueDate: dueDate,
        dueDays: dueDays !== undefined ? parseInt(dueDays) : undefined,
        taskType: taskType,
        priority: restValues.priority || 'BAIXA',
      };

      onSave(newTask);
      form.resetFields();
      resetEditing();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    resetEditing();
  };

  const handleTaskTypeChange = (value: string) => {
    setTaskType(value);
    form.setFieldsValue({
      taskType: value,
      dueDate: value === 'DATA' ? null : undefined,
      dueDays: value === 'PRAZO' ? undefined : undefined,
    });
  };

  return (
    <Modal
      title={add ? 'Adicionar Tarefa' : 'Editar Tarefa'}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {add ? 'Adicionar' : 'Salvar'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={task || { taskType: 'LIVRE', priority: 'BAIXA', status: '' }}
      >
        <Form.Item
          name="title"
          label="Título da Tarefa"
          rules={[{ required: true, message: 'Por favor, insira o título da tarefa' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descrição"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="taskType"
          label="Tipo de Tarefa"
          initialValue="LIVRE"
        >
          <Select value={taskType} onChange={handleTaskTypeChange}>
            <Select.Option value="DATA">DATA</Select.Option>
            <Select.Option value="PRAZO">PRAZO</Select.Option>
            <Select.Option value="LIVRE">LIVRE</Select.Option>
          </Select>
        </Form.Item>
        {taskType === 'DATA' && (
          <Form.Item
            name="dueDate"
            label="Data de Vencimento"
            rules={[{ required: true, message: 'Por favor, selecione a data de vencimento' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        )}
        {taskType === 'PRAZO' && (
          <Form.Item
            name="dueDays"
            label="Prazo em Dias"
            rules={[{ required: true, message: 'Por favor, insira o prazo em dias' }]}
          >
            <Input type="number" />
          </Form.Item>
        )}
        <Form.Item
          name="priority"
          label="Prioridade"
        >
          <Select>
            <Select.Option value="BAIXA">Baixa</Select.Option>
            <Select.Option value="MEDIA">Média</Select.Option>
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
