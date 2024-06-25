import { Task } from '../interfaces/Task';

import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchTasks = () => {
  return axios.get(`${API_URL}/tasks`);
};

export const createTask = (task: Task) => {
  return axios.post(`${API_URL}/tasks`, task);
};

export const updateTask = (id: number, task: Task) => {
  return axios.put(`${API_URL}/tasks/${id}`, task);
};

export const deleteTask = (id: number) => {
  return axios.delete(`${API_URL}/tasks/${id}`);
};

export const deleteAllTasks = async () => {
  return axios.delete(`${API_URL}/tasks`);
};

export const fetchTaskById = async (taskId: number) => {
  const url = `${API_URL}/tasks/${taskId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
