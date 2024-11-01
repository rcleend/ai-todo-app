import * as request from 'supertest';
import app from '../src/app';
import mongoose from 'mongoose';

describe('Task API', () => {
  beforeAll(async () => {
    // Connect to the in-memory database or test database
    await mongoose.connect('mongodb://localhost:27017/todoapp-test');
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await mongoose.connection.close();
  });

  let taskId: string;

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Task');
    taskId = response.body.id;
  });

  it('should retrieve task list', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
}); 