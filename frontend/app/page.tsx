import React from "react";
import { getTasks } from "../lib/helper";
import Tasks from "@/features/tasks";

export const dynamic = "force-dynamic";

export default async function Home() {
  const initialTasks = await getTasks();

  return <Tasks initialTasks={initialTasks} />;
}
