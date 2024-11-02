import React from 'react';
import { Task } from '../types';

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
    <li>
      <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange} />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}: {task.description}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem; 