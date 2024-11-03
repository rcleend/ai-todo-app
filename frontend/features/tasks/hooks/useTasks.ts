import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_BASE_URL } from "@/lib/config";
import { Task } from "@/lib/types";

export function useTasks(initialTasks: Task[]) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = initialTasks, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      return response.data;
    },
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (newTask: Omit<Task, "id" | "created_at">) => {
      const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTitle("");
      setDescription("");
    },
  });

  // Update task mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Task>;
    }) => {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  // Delete task mutation
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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

  return {
    title,
    setTitle,
    tasks,
    isLoading,
    description,
    setDescription,
    handleSubmit,
    handleUpdate,
    handleDelete,
  };
}