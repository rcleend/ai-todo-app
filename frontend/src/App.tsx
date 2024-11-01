import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Task } from './types';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (description) {
      fetchSuggestions(description);
    } else {
      setSuggestions([]);
    }
  }, [description]);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
  };

  const fetchSuggestions = async (keyword: string) => {
    const response = await axios.post('/api/suggestions', { keyword });
    setSuggestions(response.data.suggestions);
  };

  const addTask = async () => {
    const response = await axios.post('/api/tasks', { title, description });
    setTasks([...tasks, response.data]);
    setTitle('');
    setDescription('');
    setSuggestions([]);
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    await axios.put(`/api/tasks/${id}`, updates);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)));
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const applySuggestion = (suggestion: string) => {
    setDescription(suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <h1>Interactive To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {suggestions.length > 0 && (
        <div>
          <h3>AI Task Suggestions</h3>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => applySuggestion(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
      <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
    </div>
  );
};

export default App; 