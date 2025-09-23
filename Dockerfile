# Development Dockerfile for Next.js with Prisma + Neon Postgres
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install system dependencies (needed for Prisma & PostgreSQL client)
RUN apk add --no-cache openssl

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose Next.js port
EXPOSE 3000

# Run migrations before starting dev server
CMD npx prisma migrate deploy && npm run dev