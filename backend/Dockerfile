# Stage 1 - Use lightweight Node image for building the NestJS app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - Use a clean Node runtime image to run the compiled app
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
# Start the compiled NestJS server
CMD ["node", "dist/main.js"]
