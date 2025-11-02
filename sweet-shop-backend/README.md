# 🍬 Sweet Shop Management System — Backend

This is the **backend** of the Sweet Shop Management System built using **Spring Boot 3**, **MongoDB Atlas**, and **JWT Authentication**.

---

## ⚙️ Tech Stack

| Layer | Technology |
|--------|-------------|
| Backend Framework | Spring Boot (3.5.7, Java 21) |
| Database | MongoDB Atlas (cloud) |
| Authentication | JWT (JSON Web Token) |
| Build Tool | Maven |
| API Docs | Swagger (via springdoc-openapi) |

---

## 🧱 Architecture Overview

backend/
├── config/ # CORS + Swagger Config
├── security/ # JWT + Security Filters
├── domain/ # MongoDB Documents (User, Sweet)
├── repository/ # MongoDB Repositories
├── dto/ # Request/Response DTOs
├── service/ # Business logic (Auth, Sweet, Inventory)
├── controller/ # REST endpoints
├── exception/ # Global exception handling
└── resources/ # application.yml


---

## 🧰 Setup Instructions

### 1️⃣ Prerequisites
- **Java 21+**
- **Maven 3.9+**
- **MongoDB Atlas account** ([create free cluster](https://www.mongodb.com/cloud/atlas))
- **Internet connection**

### 2️⃣ Configure MongoDB Connection

In `src/main/resources/application.yml`:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb+srv://sweetshop_user:<password>@<cluster-id>.mongodb.net/sweetshop
      database: sweetshop
app:
  jwt:
    secret: "REPLACE_WITH_32+_CHAR_RANDOM_SECRET"
    expires-in-ms: 86400000


