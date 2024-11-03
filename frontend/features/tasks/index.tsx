"use client";

import React from "react";
import { useTasks } from "./hooks/useTasks";
import TaskList from "./components/TaskList";
import { Task } from "@/lib/types";

export default function Tasks({ initialTasks }: { initialTasks: Task[] }) {
  const {
    title,
    setTitle,
    tasks,
    isLoading,
    description,
    setDescription,
    handleSubmit,
    handleUpdate,
    handleDelete,
  } = useTasks(initialTasks);

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

      <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
    </main>
  );
}
