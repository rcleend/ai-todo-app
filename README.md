# Interactive To-Do List Application

## Overview

A simple Interactive To-Do List Application where users can add, remove, and mark tasks as completed. Incorporates AI to provide task suggestions based on keywords entered by the user.

## Features

- **Add Tasks**: Add new tasks with a title and description.
- **Complete Tasks**: Mark tasks as completed or uncompleted.
- **Delete Tasks**: Remove tasks from the list.
- **Real-time Updates**: View an updated task list in real-time.
- **AI Suggestions**: Get task suggestions from AI based on keywords.

## Technology Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, MongoDB (via Prisma)
- **AI Integration**: OpenAI API
- **Testing**: Jest, Supertest
- **Containerization**: Docker, Docker Compose

## Prerequisites

- **Docker** and **Docker Compose** installed on your machine
- OpenAI API Key for AI task suggestions

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd interactive-todo-list
```

### 2. Environment Setup

Create `.env` files in both frontend and backend directories:

Frontend (.env):

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
GROQ_API_KEY=your_groq_api_key
```

### 3. Start the Application

Using Docker Compose (recommended!):

```bash
docker compose up --build -d
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- MongoDB: localhost:27017

### 4. Development Setup

If you want to run the application locally for development:

Frontend:

```bash
cd frontend
pnpm install
pnpm dev
```

Backend:

```bash
cd backend
pnpm install
pnpm prisma generate
pnpm dev
```

## Project Structure

```
├── frontend/ # Next.js frontend application
│ ├── app/ # Next.js app directory
│ ├── components/ # Reusable UI components
│ ├── features/ # Feature-based code organization
│ └── lib/ # Utilities and configurations
├── backend/ # Express backend application
│ ├── src/ # Source code
│ ├── prisma/ # Database schema and migrations
│ └── tests/ # Test files
└── docker-compose.yml # Docker composition configuration
```

## Testing

Run backend tests:

```bash
cd backend
pnpm test
```

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
