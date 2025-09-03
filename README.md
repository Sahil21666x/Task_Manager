# MERN Task Manager

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS.

## Features
- User authentication (register, login, logout)
- Create, update, delete tasks
- Task status badges
- Protected routes
- Responsive UI with Tailwind CSS
- Context API for state management

## Project Structure
```
mern-task-manager/
├── client/             # React client app
│   ├── src/
│   │   ├── components/ # Reusable React components
│   │   ├── pages/      # Page components (Dashboard, Login, Register)
│   │   ├── services/   # API service
│   │   ├── state/      # Context providers
├── server/             # Express server
│   ├── src/
│   │   ├── models/     # Mongoose models
│   │   ├── routes/     # API routes
│   │   ├── middleware/ # Auth middleware


## Getting Started

### Prerequisites
- Node.js & npm 
- MongoDB

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd mern-task-manager
   ```
2. Install dependencies for client and server:
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Set up environment variables for the server (e.g., MongoDB URI, JWT secret).

### Running the App
- Start the server:
  ```sh
  npm run dev
  ```
- Start the client (in a separate terminal):
  ```sh
  npm run dev
  ```

## Environment Variables
Create a `.env` file in the `server/` directory with:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## License
MIT
