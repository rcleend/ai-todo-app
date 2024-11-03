"use client";

import React from "react";
import { useTasks } from "./hooks/useTasks";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

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

const taskItemAnimationProps = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.2 },
};

export default function Tasks({ initialTasks }: TasksProps) {
  const {
    title,
    setTitle,
    tasks,
    isLoading,
    description,
    setDescription,
    handleSubmit,
    handleUpdate,
    onDeleteTask,
    isSubmitting,
  } = useTasks(initialTasks);

  const renderTaskContent = (task: Task) => (
    <div className="flex-1 min-w-0">
      <h3
        className={`font-medium ${
          task.completed ? "line-through text-muted-foreground" : ""
        }`}
      >
        {task.title}
      </h3>
      {task.description && (
        <p
          className={`text-sm ${
            task.completed
              ? "line-through text-muted-foreground"
              : "text-muted-foreground"
          }`}
        >
          {task.description}
        </p>
      )}
    </div>
  );

  return (
    <div className="container flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] mx-auto py-8 space-y-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[600px]">
        <CardHeader>
          <CardTitle>Task Manager</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="resize-none"
              />
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="w-full max-w-[600px]">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              {...taskAnimationProps}
              className="mb-3"
            >
              <motion.div
                {...taskItemAnimationProps}
                className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() =>
                  handleUpdate(task.id, { completed: !task.completed })
                }
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() =>
                    handleUpdate(task.id, { completed: !task.completed })
                  }
                  className="mt-1"
                  onClick={(e) => e.stopPropagation()}
                />
                {renderTaskContent(task)}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                  }}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
