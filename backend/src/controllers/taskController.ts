import { Request, Response } from 'express';
import { Task } from '../models/taskModel.js';

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task.' });
  }
};

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ created_at: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task.' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task.' });
  }
}; 