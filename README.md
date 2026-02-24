🏫 Smart Complaint Management System (SCMS)
📌 Project Overview

A full-stack web application where:

Users can register, login, raise complaints, and track status.

Admin can view and resolve complaints.

Authentication is handled using JWT.

Role-based access control is implemented.

🛠 1️⃣ Backend Requirements (Spring Boot)
✅ Tech Stack

Java 17+

Spring Boot 3

Spring Security

JWT (jjwt)

Spring Data JPA

MySQL

Lombok

Maven

✅ Backend Modules Needed
1. Entities

User

Complaint

Role (ENUM: USER, ADMIN)

Status (ENUM: PENDING, IN_PROGRESS, RESOLVED)

2. Repositories

UserRepository

ComplaintRepository

3. Services

AuthService (register, login)

ComplaintService (create, fetch, update)

4. Controllers

AuthController

ComplaintController (User APIs)

AdminController (Admin APIs)

5. Security

JwtUtil (generate & validate token)

JwtFilter (validate token per request)

CustomUserDetailsService

SecurityConfig (role-based access)

6. Exception Handling

GlobalExceptionHandler

ResourceNotFoundException

✅ Database Requirements
users table

id (PK)

name

email (Unique)

password (Encrypted)

role (USER / ADMIN)

complaints table

id (PK)

title

description

category

status

resolutionNote

user_id (FK)

createdAt

updatedAt

✅ Backend APIs Needed
🔐 Authentication

POST /api/auth/register

POST /api/auth/login

👤 User

POST /api/complaints

GET /api/complaints

🛠 Admin

GET /api/admin/complaints

PUT /api/admin/complaints/{id}

🎨 2️⃣ Frontend Requirements (React)
✅ Tech Stack

React

React Router

Axios

Context API or Redux (optional)

Tailwind CSS / Bootstrap (optional)

✅ Pages Needed
1️⃣ Authentication Pages

Login Page

Register Page

2️⃣ User Dashboard

Welcome section

Create Complaint form

View My Complaints table

Status badge (PENDING / RESOLVED)

Logout button

3️⃣ Admin Dashboard

All complaints table

Filter by status

Update status dropdown

Add resolution note

Logout button

✅ Frontend Folder Structure
src/
 ├── pages/
 │     ├── Login.jsx
 │     ├── Register.jsx
 │     ├── UserDashboard.jsx
 │     ├── AdminDashboard.jsx
 │
 ├── components/
 │     ├── Navbar.jsx
 │     ├── ComplaintForm.jsx
 │     ├── ComplaintTable.jsx
 │
 ├── services/
 │     ├── api.js
 │
 ├── context/
 │     ├── AuthContext.jsx
✅ Frontend Features Needed

Store JWT token in localStorage

Send token in Authorization header:

Authorization: Bearer <token>

Redirect based on role:

USER → User Dashboard

ADMIN → Admin Dashboard

Protected routes

Form validation

🔐 Security Requirements (Full Stack)

BCrypt password encryption

JWT token generation

JWT token validation

Role-based authorization

Protected frontend routes

Token expiry handling

⚙️ Configuration Needed
Backend (application.properties)

MySQL connection

JWT secret key (min 32 chars)

JWT expiration time

Frontend

Base URL for backend:

http://localhost:8080
🚀 Steps to Run Project
Backend

Create MySQL database

Configure application.properties

Run: mvn spring-boot:run

Frontend

Run: npm install

Run: npm start
