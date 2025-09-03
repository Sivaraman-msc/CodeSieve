# CodeSieve  
### _An Online Coding Assessment Platform_

---

## About the Project

**CodeSieve** is a full-stack web application developed to streamline the process of conducting online coding assessments for candidates. It allows interviewers to assign coding tests and review candidate submissions, while candidates can write and save code directly in the browser using an embedded code editor.

Built with modern tools like React, Node.js, and MongoDB, CodeSieve provides a responsive and secure environment for managing coding challenges effectively.

---

## Features

- **Candidate Interface**
  - View coding questions
  - Write, edit, and save code using Monaco Editor
  - Submit completed assessments

- **Interviewer Interface**
  - Assign coding assessments
  - View candidate submissions
  - Review answers and score candidates

- **Authentication**
  - Role-based login system (Candidate/Interviewer)
  - Token-based security with JWT and cookies

- **Editor**
  - Integrated Monaco Code Editor with syntax highlighting
  - Real-time code editing and saving

- **Others**
  - Responsive design with Tailwind CSS
  - Clean and user-friendly UI

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Monaco Editor

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Cookie-based sessions

---

## Workflow

1. **Login**: Candidate logs in via a secure portal.  
2. **Test Load**: Candidate receives the assigned coding questions.  
3. **Code Editor**: Write and save code for each question.  
4. **Submit Test**: Submit all answers for final evaluation.  
5. **Review**: Interviewer logs in, views submission details, and provides scoring.

---

## Quick Start

Run these commands to quickly set up and start the project:

```bash
# Clone the repository
git clone <your-repo-url>
cd CodeSieve

# Install backend dependencies
cd CodeSieve-Backend
npm install

# Seed the database with initial data
npm run seed

# Start the backend server
npm start

# Open a new terminal, install frontend dependencies
cd ../CodeSieve-Frontend
npm install

# Start the frontend development server
npm run dev
