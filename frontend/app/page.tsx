'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import TaskList from './components/TaskList';
import { Task } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      return response.data;
    },
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, 'id' | 'created_at'>) => {
      const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTitle('');
      setDescription('');
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTaskMutation.mutate({
      title,
      description,
      completed: false,
    });
  };

  const handleUpdate = (id: string, updates: Partial<Task>) => {
    updateTaskMutation.mutate({ id, updates });
  };

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </form>

      <TaskList
        tasks={tasks}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </main>
  );
}
