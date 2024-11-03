FROM node:20-slim

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY prisma ./prisma/
RUN pnpm prisma generate

COPY . .
RUN pnpm build

EXPOSE 8080

CMD ["pnpm", "start"]