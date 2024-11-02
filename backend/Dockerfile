# Use an official Node.js image as the base image
FROM node:18-alpine

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the backend code
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build TypeScript
RUN pnpm run build

# Expose port 8080
EXPOSE 8080

# Start the backend server
CMD ["pnpm", "start"]