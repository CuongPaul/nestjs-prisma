# Step 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Step 2: Run
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN pnpm install --prod
COPY --from=builder /app/package.json ./package.json
# Ensure the entry point matches your build output (e.g., dist/main.js or dist/index.js)
CMD ["node", "dist/main.js"]
CMD ["node", "dist/main"]
