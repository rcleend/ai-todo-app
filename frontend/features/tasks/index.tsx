"use client";

import React from "react";
import { Task } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "./hooks/useTasks";
import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";

interface TasksProps {
  initialTasks: Task[];
}

const taskAnimationProps = {
  initial: { opacity: 0, height: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2 },
  },
};

export default function Tasks({ initialTasks }: TasksProps) {
  const { tasks, handleUpdate, onDeleteTask, onSubmit } =
    useTasks(initialTasks);

  return (
    <div className="container flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] mx-auto py-8 space-y-8 px-4 sm:px-6 lg:px-8">
      <TaskForm onSubmit={onSubmit} />

      <div className="w-full max-w-[600px]">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              {...taskAnimationProps}
              className="mb-3"
            >
              <TaskItem
                task={task}
                onUpdate={handleUpdate}
                onDelete={onDeleteTask}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
