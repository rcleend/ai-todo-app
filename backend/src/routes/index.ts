import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controllers/taskController.js';
import { getSuggestions } from '../controllers/aiController.js';

const router = express.Router();

// Task routes
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

// AI suggestions route
router.post('/suggestions', getSuggestions);

export default router; 