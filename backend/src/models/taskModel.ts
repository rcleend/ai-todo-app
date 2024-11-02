import { PrismaClient } from '@prisma/client';
import { Task } from '../interfaces/task.js';

const prisma = new PrismaClient();

// Create a new task
export const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
  const newTask = await prisma.task.create({
    data: taskData,
  });
  return newTask;
};

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  const tasks = await prisma.task.findMany();
  return tasks;
};

// Get a task by ID
export const getTaskById = async (id: string): Promise<Task | null> => {
  const task = await prisma.task.findUnique({
    where: { id },
  });
  return task;
};

// Update a task
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  const updatedTask = await prisma.task.update({
    where: { id },
    data: taskData,
  });
  return updatedTask;
};

// Delete a task
export const deleteTask = async (id: string): Promise<Task> => {
  const deletedTask = await prisma.task.delete({
    where: { id },
  });
  return deletedTask;
}; 