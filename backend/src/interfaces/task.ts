export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
}
