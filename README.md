# purposes-back

Backend API for a personal goals and weekly task tracking app. The project is built with TypeScript, Express, Prisma, PostgreSQL, JWT authentication, and bcrypt password hashing.

## Overview

This service currently provides:

- User registration and login
- JWT-protected goal endpoints
- JWT-protected task endpoints
- A Prisma data model for users, goals, tasks, groups, and feedback

The API is small and direct, and the current implementation is oriented around a frontend client sending JSON payloads to Express routes under `/api/*`.

## Tech Stack

- Node.js
- TypeScript
- Express 5
- Prisma ORM
- PostgreSQL
- JWT (`jsonwebtoken`)
- `bcrypt`

## Project Structure

```text
.
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── auth.middleware.ts
│   ├── app.ts
│   ├── index.ts
│   └── utils/
├── package.json
└── tsconfig.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=4000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/purposes"
JWT_SECRET="replace-with-a-long-random-secret"

# Optional / future password recovery support
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
FRONTEND_URL=http://localhost:3000
```

### 3. Run database migrations

```bash
npm run prisma:migrate
```

This project uses Prisma migrations and expects PostgreSQL.

### 4. Start the API

```bash
npm start
```

By default the server runs on:

```text
http://localhost:4000
```

The root endpoint responds with a simple health message:

```http
GET /
```

## Available Scripts

- `npm start` - runs the API with `tsx`
- `npm run prisma:migrate` - runs Prisma development migrations
- `npm run prisma:studio` - opens Prisma Studio

## Data Model

The Prisma schema currently defines these main entities:

- `User`
- `Goal`
- `Task`
- `Group`
- `GroupMember`
- `Feedback`

There is also a mapped but ignored Prisma model named `GroupWeeklyStats`, intended for a materialized view called `group_weekly_stats`.

## Authentication

Login returns a JWT token signed with `JWT_SECRET`.

Protected endpoints expect this header:

```http
Authorization: Bearer <token>
```

## API Routes

Base route prefixes:

- `/api/auth-svc`
- `/api/goal-svc`
- `/api/task-svc`

### Auth

| Method | Route | Auth | Body |
| --- | --- | --- | --- |
| `POST` | `/api/auth-svc/signin` | No | `email`, `password`, `name` |
| `POST` | `/api/auth-svc/login` | No | `email`, `password` |
| `POST` | `/api/auth-svc/recover-password` | No | `email` |

Example sign-in payload:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "strong-password"
}
```

Example login response:

```json
{
  "user": {
    "id": "uuid",
    "name": "Alice",
    "email": "alice@example.com",
    "password": "hashed-password",
    "createdAt": "2025-04-09T00:00:00.000Z",
    "lastModified": "2025-04-09T00:00:00.000Z"
  },
  "token": "jwt-token"
}
```

### Goals

| Method | Route | Auth | Body |
| --- | --- | --- | --- |
| `POST` | `/api/goal-svc/create` | Yes | `title`, `userId` |
| `DELETE` | `/api/goal-svc/delete` | Yes | `goalId` |
| `POST` | `/api/goal-svc/user-goals` | Yes | `userId` |

### Tasks

| Method | Route | Auth | Body |
| --- | --- | --- | --- |
| `POST` | `/api/task-svc/create` | Yes | `title`, `week`, `goalId` |
| `DELETE` | `/api/task-svc/delete` | Yes | `id` |
| `POST` | `/api/task-svc/week-user-tasks` | Yes | `userId`, `week` |
| `PUT` | `/api/task-svc/update` | Yes | `id`, `title`, `week` |
| `PUT` | `/api/task-svc/change-status` | Yes | `id`, `completed` |

## Notes About Current Behavior

- Passwords are hashed with `bcrypt` during sign-up.
- JWT tokens expire after 7 days.
- Protected routes use authentication middleware, but the current controllers still accept `userId`, `goalId`, and task IDs directly from the request body. Ownership and authorization checks are minimal.
- `recover-password` is not fully implemented yet. The email utility exists, but the service currently only looks up the user and returns it.
- The email helper references `nodemailer`, but that package is not currently listed in `package.json`.
- Prisma clients are created inside each service method. This works, but most production deployments would usually centralize Prisma client creation.

## Development Notes

If you want to extend this project, good next steps would be:

- add request validation
- enforce authorization based on the JWT payload instead of trusting body fields
- finish the password reset flow
- add tests
- add a shared Prisma client instance
- document response/error formats more formally

## License

The repository currently declares the `ISC` license in `package.json`.
