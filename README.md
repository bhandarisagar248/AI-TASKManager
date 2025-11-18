⭐ AI Task Manager

A modern AI-powered task manager built using React, Spring Boot, and MongoDB with real-time notifications, email reminders, stopwatch, alarms, and premium UI with full dark/light mode.

🚀 Features
✔ Task Management

Add, edit, delete, and categorize tasks

Due dates, priority, filters

Stopwatch + Alarm built-in

🤖 AI Features

AI task analysis & insights

Smart suggestions and daily summaries

Scheduled AI-generated reminders

🔔 Notifications

Real-time WebSocket notifications

Stored in MongoDB

Read/unread states

Email alerts for due tasks

🎨 Premium UI

Fully responsive

Smooth animations

Notification center

Dark & light modes

🛠 Tech Stack

Frontend: React, Vite, TailwindCSS, Axios, WebSockets
Backend: Spring Boot, MongoDB, STOMP WebSockets, Scheduler, Java Mail
Database: MongoDB

📡 API Endpoints (Short)

Tasks

POST /api/task/create

GET /api/task/all

PUT /api/task/update

DELETE /api/task/delete/{id}

AI

POST /api/ai/analyze

Notifications

GET /api/notifications/{email}

POST /api/notifications/send

WebSocket Endpoint

/ws/notifications
/topic/notifications/{email}

⚙️ Setup
Backend
cd backend
mvn spring-boot:run

Frontend
cd frontend
npm install
npm run dev
