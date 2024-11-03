import React from 'react';
import Tasks from './features/tasks';
import { getTasks } from './lib/helper';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const initialTasks = await getTasks();

  return (
    <Tasks initialTasks={initialTasks} />
  );
}
