import * as request from 'supertest';
import app from '../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

describe('Task API', () => {
  let mongoServer: MongoMemoryServer;
  let client: MongoClient;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Override the client in app.ts
    client = new MongoClient(uri);
    await client.connect();
    app.locals.client = client; // Assuming you modify app.ts to accept client from locals

    console.log('Test database connected');
  });

  afterAll(async () => {
    if (client) {
      await client.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
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