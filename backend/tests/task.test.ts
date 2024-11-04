import { PrismaClient, Task } from "@prisma/client";
import * as taskModel from "../src/models/taskModel";

describe("Task API", () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up the tasks collection before each test
    await prisma.task.deleteMany({});
  });

  it("should create a new task", async () => {
    const taskData = {
      title: "Test Task",
      description: "This is a test task",
      completed: false,
      created_at: new Date(),
    };

    const newTask = await taskModel.createTask(taskData);

    expect(newTask).toBeDefined();
    expect(newTask.title).toBe(taskData.title);
    expect(newTask.description).toBe(taskData.description);
    expect(newTask.completed).toBe(taskData.completed);
    expect(newTask.id).toBeDefined();
    expect(newTask.created_at).toBeDefined();
  });

  it("should retrieve all tasks", async () => {
    // Create multiple tasks first
    const tasksData = [
      {
        title: "Task 1",
        description: "Description 1",
        completed: false,
        created_at: new Date(),
      },
      {
        title: "Task 2",
        description: "Description 2",
        completed: true,
        created_at: new Date(),
      },
    ];

    await Promise.all(
      tasksData.map((taskData) => taskModel.createTask(taskData))
    );

    // Retrieve all tasks
    const tasks = await taskModel.getTasks();

    expect(tasks).toBeDefined();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBe(2);

    // Verify tasks are ordered by creation date (desc)
    expect(tasks[0].created_at.getTime()).toBeGreaterThanOrEqual(
      tasks[1].created_at.getTime()
    );

    // Verify task properties
    tasks.forEach((task: Task, index: number) => {
      expect(task.title).toBe(tasksData[index].title);
      expect(task.description).toBe(tasksData[index].description);
      expect(task.completed).toBe(tasksData[index].completed);
      expect(task.id).toBeDefined();
      expect(task.created_at).toBeDefined();
    });
  });
});
