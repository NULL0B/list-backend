# Todo List Backend

This is the backend service for the Todo List application built with Express.js, Prisma, MySQL and **Clean Architecture (no ioc)**.

# Live At
https://todo-list-f72bb.web.app (firebase branch)


## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   ```bash
   cp example.env .env
   ```
   Then edit `.env` with your MySQL database credentials.

3. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

   Btw, use https://aiven.io/ Free tier.

4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```


The server will start on port 3001 (or the port specified in your .env file).

## API Endpoints

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get specific task (extra to avoid using localstorage)
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
