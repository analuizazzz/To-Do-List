import axios from 'axios';
import { Task } from '../interfaces/Task';

const API_URL = 'http://localhost:8080/tasks'; 

export const fetchTasks = () => axios.get<Task[]>(API_URL);

export const fetchTaskById = (id: number) => axios.get<Task>(`${API_URL}/${id}`);

export const createTask = (newTask: Task) => axios.post<Task>(API_URL, newTask);

export const updateTask = (id: number, updatedTask: Task) => axios.put<Task>(`${API_URL}/${id}`, updatedTask);

export const deleteTask = (id: number) => axios.delete(`${API_URL}/${id}`);

export const deleteAllTasks = () => axios.delete(API_URL);
