"use client";

import React from "react";
import { useTasks } from "./hooks/useTasks";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

export default function Tasks({ initialTasks }: { initialTasks: Task[] }) {
  const { toast } = useToast();
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
    isSubmitting,
  } = useTasks(initialTasks);

  const onDeleteTask = (id: string) => {
    handleDelete(id);
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    });
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] mx-auto">
        <Card className="w-[600px]">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] mx-auto py-8 space-y-8">
      <Card className="w-[600px]">
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

      <div className="w-[600px] space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() =>
                  handleUpdate(task.id, { completed: !task.completed })
                }
                className="mt-1"
              />
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteTask(task.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
