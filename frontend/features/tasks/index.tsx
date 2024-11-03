"use client";

import React from "react";
import { Task } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useTasks } from "./hooks/useTasks";
import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";
import { EmptyTasks } from "./components/EmptyTasks";

interface TasksProps {
  initialTasks: Task[];
}

const taskAnimationProps = {
  initial: {
    opacity: 0,
    height: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    height: "auto",
    scale: 1,
    transition: {
      height: {
        duration: 0.3,
        ease: "easeOut",
      },
      opacity: {
        duration: 0.2,
        delay: 0.2,
      },
      scale: {
        duration: 0.2,
        delay: 0.2,
      },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    scale: 0.8,
    transition: {
      height: {
        duration: 0.2,
        delay: 0.1,
      },
      opacity: {
        duration: 0.1,
      },
      scale: {
        duration: 0.1,
      },
    },
  },
};

export default function Tasks({ initialTasks }: TasksProps) {
  const { tasks, handleUpdate, onDeleteTask, onSubmit } =
    useTasks(initialTasks);

  return (
    <div className="container flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] mx-auto py-8 space-y-8 px-4 sm:px-6 lg:px-8">
      <TaskForm onSubmit={onSubmit} tasks={tasks} />

      <div className="w-full max-w-[600px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
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
            ))
          ) : (
            <EmptyTasks />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
