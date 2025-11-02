# 🍬 Sweet Shop Management System

The **Sweet Shop Management System** is a full-stack web application designed to simplify sweet shop operations such as product management, user authentication, and order handling.  
It provides an admin dashboard for managing sweets and users, and a customer-facing interface for browsing and purchasing sweets online.

---

## 🧁 Overview

This system is built with:
- 🧩 **Spring Boot (Backend)** — REST APIs, Security, and MongoDB integration.
- ⚛️ **React + Vite (Frontend)** — Modern UI for admin and users.
- 🍃 **MongoDB Atlas (Database)** — NoSQL database for managing sweets and users.

---

## 🧠 AI Usage in the Project

This project integrates **AI-assisted workflows** to improve development and maintainability:

| AI Feature | Description |
|-------------|--------------|
| 🧩 **Code Generation Assistance** | Spring Boot controllers, services, and tests were partially auto-generated using AI tools (ChatGPT & Copilot) to reduce boilerplate. |
| 🧪 **AI-Enhanced Testing** | AI suggested edge-case test scenarios for service and controller layers. |
| 🧠 **Documentation & Refactoring** | AI tools were used to auto-generate JavaDocs, Markdown docs, and refactor repetitive logic. |
| 🔐 **Security Configuration** | AI reviewed Spring Security setup to handle JWT authentication with CORS and Password Encoding. |
| 🎨 **Frontend Optimization** | AI-assisted in improving UI/UX using React component design suggestions. |

> ⚙️ AI was used **only as a development assistant** — all critical logic was reviewed and tested manually.

---

## 🧩 Features

### 👨‍💼 Admin
- Manage sweets (Add, Update, Delete)
- Manage users and roles
- Track inventory and purchases
- Admin Credential [As per now we can edit role in database only by default all the users role is set to "USER".In database we can chage role.]
  ```palintext
     admin@sweetshop.com
  ```
  ```palintext
     admin123
  ```

### 🧑‍🤝‍🧑 Customer
- Register and Login securely (JWT)
- Browse available sweets
- Purchase sweets (with stock validation)

### ⚙️ Technical Features
- Full JWT-based authentication system
- Role-based access control (Admin/User)
- RESTful API architecture
- Centralized CORS & Security configuration
- Real-time updates (React state management)

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Vite + Axios |
| Backend | Spring Boot 3.5.3 + Gradle |
| Database | MongoDB Atlas |
| Authentication | JWT + BCrypt PasswordEncoder |
| Testing | JUnit 5 + Mockito |
| Build Tools | Gradle + Vite |

---

## 🏗️ Project Structure

---
```plaintext
sweet-shop-management-system/
│
├── sweet-shop-frontend/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── api/ # Axios setup & API services
│ │ ├── components/ # Reusable React components
│ │ └── pages/ # UI pages (Dashboard, Login, etc.)
│ └── package.json
│
└── sweet-shop-backend/ # Backend (Spring Boot)
├── src/
│ ├── main/
│ │ ├── java/com/sweetshop/sweet_shop_backend/
│ │ │ ├── controller/ # REST Controllers
│ │ │ ├── service/ # Business Logic
│ │ │ ├── repository/ # Mongo Repositories
│ │ │ └── security/ # JWT & Security Config
│ │ └── resources/
│ │ ├── static/ # Frontend build (for deployment)
│ │ └── application.properties
└── build.gradle
```

---

## 🧭 Setup Instructions

### 🧰 Prerequisites
Ensure the following are installed:
- Node.js (v18+)
- npm or yarn
- Java 21+
- MongoDB (local or Atlas)
- Gradle (wrapper is included)

---

## 🚀 Setup and Run

### 🔹 Backend (Spring Boot)
---

1. Go to backend folder:
   ```bash
   cd sweet-shop-backend
2. Configure MongoDB in src/main/resources/application.properties:
   ```plaintext
   spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster-url>/sweetshop
    spring.data.mongodb.database=sweetshop
    jwt.secret=your_jwt_secret_key
    server.port=8080
   ```
3. Build and run:
  ```bash
    mvn spring-boot:run
  ```
4. API will be available at:
  ```plaintext
    http://localhost:8080
  ```
---
### 🔹 Frontend (React + Vite)
---
1. Go to frontend folder:
   ```bash
     cd sweet-shop-frontend
   ```
2. Install dependencies:
   ```bash
     npm install
   ```
3. Configure API URL in .env:
    ```plaintext
      VITE_API_BASE_URL=http://localhost:8080/api
    ```
4. Run the frontend:
   ```bash
     npm run dev
   ```
5. App will be available at:
   ```plaintext
      http://localhost:5173
   ```
---
## 🧠 AI Contribution Summary
---

| **Area** | **AI Contribution** | **Final Review** |
|-----------|----------------------|------------------|
| 🧩 Backend Service Layer | Generated base methods using ChatGPT | ✅ Manually validated |
| 🧪 Test Case Generation | AI suggested mocks & edge cases | ✅ Adjusted for accuracy |
| ⚛️ Frontend API Layer | AI proposed Axios interceptor logic | ✅ Rewritten manually |
| 📝 Documentation | README, comments & refactor suggestions | ✅ Reviewed and edited |
| 🔐 Security Config | AI proposed initial CORS + JWT logic | ✅ Finalized by developer |

```plaintext
All AI-generated code was manually tested, reviewed, and optimized to ensure correctness, security, and maintainability.
```
---
##🧾 Author & Contributors
---

👨‍💻 Developer: Sathwik Bairy P N
📘 Project: Sweet Shop Management System
🗓️ Version: 1.0
📍 Location: India

---












