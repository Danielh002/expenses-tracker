# fullstack-expense-tracker

Project that showcases a simple expense tracking stack using NestJS + React, designed to be deployed to AWS ECS Fargate (the infrastructure code lives in the sibling `infra-expense-tracker` repository).

## Project Layout

```
fullstack-expense-tracker/
├── backend/   # NestJS REST API
├── frontend/  # React + Vite SPA
├── docker-compose.yml
├── build_and_push.sh
└── README.md
```

## Features
- Add, list, and summarize expenses (in-memory store for demo purposes).
- Health endpoint for uptime monitoring.
- DTO validation, logging, and global exception handling in the API.
- React client with Tailwind styling, React Router pages, and Axios data fetching.
- Ready-to-build Docker images for both services.

## Getting Started

### 1. Requirements
- Node.js 18+
- npm 9+
- Docker Desktop (for container workflow)
- AWS CLI v2 (for pushing to ECR)

### 2. Environment Variables
Both apps ship with `.env.example` files. Copy them before running locally:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```
Adjust `VITE_API_URL` in the frontend env file if your backend runs on a different host/port.

### 3. Local Development

#### Run the backend
```bash
cd backend
npm install
npm run start:dev
```

#### Run the frontend
```bash
cd frontend
npm install
npm run dev
```

#### Docker Compose (full stack)
```bash
docker-compose up --build
```
- API: http://localhost:3000
- Web: http://localhost:5173

### 4. Testing & Linting

```bash
cd backend && npm test && npm run lint
cd frontend && npm run lint
```

## Docker Images & ECS Handoff

Use the helper script to build and push both images to ECR. `infra-expense-tracker` consumes the resulting image URIs via Terraform variables.

```bash
./build_and_push.sh <aws-account-id> <aws-region> [image-tag]
```
- Example: `./build_and_push.sh 123456789012 us-east-1 v0.1.0`
- Update the Terraform variables (`backend_image`, `frontend_image`) in the infra repo with the pushed image tags.

## Next Steps for infra-expense-tracker
- Create two ECR repos: `fullstack-expense-tracker-backend` and `fullstack-expense-tracker-frontend`.
- ECS task definitions reference the pushed images + expose ports 3000 (API) and 80 (web).
- Pass `PORT`/`STAGE` env vars to the backend task and `VITE_API_URL` to the frontend build stage.

## Tooling Notes
- ESLint + Prettier configs live in each package for consistent formatting.
- Dockerfiles contain inline comments for clarity and are optimized for small images (Node 18 Alpine + nginx for static assets).
- All configuration is `.env` driven so it can plug into any CI/CD pipeline.
