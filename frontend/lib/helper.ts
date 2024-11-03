import { API_BASE_URL } from "./config";

export async function getTasks() {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
}
