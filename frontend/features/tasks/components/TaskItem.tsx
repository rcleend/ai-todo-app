import React from "react";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export const taskItemAnimationProps = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.2 },
};

export function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const renderTaskContent = () => (
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
    <motion.div
      {...taskItemAnimationProps}
      className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={() => onUpdate(task.id, { completed: !task.completed })}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() =>
          onUpdate(task.id, { completed: !task.completed })
        }
        className="mt-1"
        onClick={(e) => e.stopPropagation()}
      />
      {renderTaskContent()}
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
