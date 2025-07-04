
# 🧩 Bistro Boss – Full Stack Web App

A modern full-stack restaurant or food ordering application built using:

- 🧠 **Frontend**: React 19, Vite, TailwindCSS, DaisyUI, React Hook Form, TanStack Query, GSAP
- ⚙️ **Backend**: Express.js, MongoDB, Node.js
- 🔐 **Features**: Auth (Firebase), EmailJS, Dark/Light Theme, Animated UI

---

## 📦 Project Structure

```
.
├── client/      → React + Vite frontend
└── backend/     → Node.js + Express backend
```

---

## 🚀 Features

### 🔹 Frontend (`/client`)
- ⚡ Vite-powered React 19 app
- 🎨 Beautiful responsive UI with **TailwindCSS + DaisyUI**
- 🔄 **React Hook Form** with Zod validation
- 📡 API requests with **Axios**
- ⚛️ **TanStack Query** for data fetching and caching
- ✨ **GSAP animations** and parallax effects
- 🔐 **Firebase authentication**
- 🌗 Light/Dark theme toggle using DaisyUI
- 📬 Email support via **EmailJS**

### 🔹 Backend (`/backend`)
- 🖥️ Express server with REST API endpoints
- 💾 MongoDB with native driver
- 🔐 CORS + environment variables with `dotenv`
- 🔄 Nodemon for live reload in development

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | React, Vite, TailwindCSS, DaisyUI    |
| Animations | GSAP, React Parallax                 |
| State/Data | React Hook Form, TanStack Query      |
| Auth       | Firebase Auth                        |
| Backend    | Express.js, MongoDB, Nodemon         |
| Email      | EmailJS                              |

---

## 📂 Getting Started

### 📦 Backend

```bash
cd backend
npm install
npm run start
```

Make sure you add your `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

### 💻 Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Environment Variables

- **Backend**:
  - `PORT` – your backend server port
  - `MONGODB_URI` – your MongoDB connection string

- **Frontend**:
  - Firebase config
  - EmailJS public key

Use `.env` files in both folders and load them securely.

---

## 📸 Screenshots

> _You can add images here using GitHub markdown or deployed links_


![](fullpage.png)
![](dashboard.png)


---

## 📮 Contact

Created with 💙 by [Argho Dev]

> Feel free to open an issue or pull request for suggestions or improvements.
