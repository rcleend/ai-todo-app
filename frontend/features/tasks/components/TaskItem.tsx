import { Task } from "@/lib/types";
import React from "react";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate, onDelete }) => {
  const handleCheckboxChange = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  return (
    <li className="group flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center flex-1 min-w-0">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxChange}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
          />
          <div className="ml-3 min-w-0">
            <h3
              className={`font-medium text-gray-900 truncate ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-sm text-gray-500 truncate ${
                  task.completed ? "line-through" : ""
                }`}
              >
                {task.description}
              </p>
            )}
          </div>
        </label>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200"
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
