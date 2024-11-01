import { Schema, model, Document } from 'mongoose';

export interface TaskDocument extends Document {
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

const TaskSchema = new Schema<TaskDocument>({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

export const Task = model<TaskDocument>('Task', TaskSchema); 