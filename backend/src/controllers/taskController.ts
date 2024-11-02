import { Request, Response } from 'express';
import * as taskModel from '../models/taskModel.js';

// Create a new task
export const addTask = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const taskData = req.body;
    const newTask = await taskModel.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get a task by ID
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskModel.getTasks();

    if (tasks) {
      res.json(tasks);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const taskData = req.body;
    const updatedTask = await taskModel.updateTask(id, taskData);
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedTask = await taskModel.deleteTask(id);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
}; 