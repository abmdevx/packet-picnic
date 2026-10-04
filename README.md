<p align="center">
  <img src="./public/logo.png" alt="Packet Picnic" width="500">
</p>

<h1 align="center">Packet Picnic</h1>

<p align="center">
  A modern, full-stack file sharing platform built for fast and simple file uploads.
</p>

<p align="center">
  Upload files, store them securely, and share them instantly with a unique link.
</p>

---

## ✨ Features

* 📤 **File Uploads** — Upload files directly to cloud storage.
* ☁️ **Cloudinary Storage** — Reliable cloud-based file storage.
* 🔗 **Shareable Links** — Generate unique links for every uploaded file.
* 📥 **File Downloads** — Download shared files through generated download URLs.
* 🔐 **Authentication** — Protected dashboard and user-specific files.
* 📊 **File Dashboard** — View uploaded files and download statistics.
* 🗑️ **Trash Management** — Manage deleted files from the dashboard.
* ⚡ **Fast & Responsive UI** — Modern interface built with React and Tailwind CSS.
* 🔒 **Server-Side Secrets** — Sensitive Cloudinary operations are handled by the backend.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express
* TypeScript
* MongoDB
* Mongoose
* Cloudinary
* JWT Authentication
* Nanoid

---

## 🏗️ Architecture

```text
┌─────────────────────┐
│      React App      │
│  Vite + TypeScript  │
└──────────┬──────────┘
           │
           │ REST API
           ▼
┌─────────────────────┐
│   Express Backend   │
│     TypeScript      │
└───────┬───────┬─────┘
        │       │
        │       │
        ▼       ▼
   ┌────────┐ ┌────────────┐
   │ MongoDB│ │ Cloudinary │
   └────────┘ └────────────┘
```

---

## 📂 Project Structure

```text
packet-picnic/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layout/
│   │   ├── pages/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.ts
│   │
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/abmdevx/packet-picnic.git

cd packet-picnic
```

### 2. Install dependencies

Install dependencies for both the frontend and backend:

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Configure environment variables

Create `.env` files for the frontend and backend.

#### Client

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_API_KEY=your_api_key
```

#### Server

```env
PORT=8000
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

JWT_SECRET=your_jwt_secret
```

> Never expose `CLOUDINARY_API_SECRET` or other server-side secrets in the frontend.

---

## ▶️ Running the Project

### Start the backend

```bash
cd server
npm run dev
```

The API will run on:

```text
http://localhost:8000
```

### Start the frontend

In another terminal:

```bash
cd client
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

## 🔄 How It Works

```text
User
  │
  ▼
Select File
  │
  ▼
React Frontend
  │
  ├── Requests upload signature
  │
  ▼
Express Backend
  │
  ├── Generates secure signature
  │
  ▼
Cloudinary
  │
  ├── Stores uploaded file
  │
  ▼
Express Backend
  │
  ├── Saves file metadata
  │
  ▼
MongoDB
  │
  ▼
Unique Share Link
```

Each uploaded file receives a unique identifier that can be used to access its sharing page.

Example:

```text
http://localhost:5173/files/abc123xyz
```

---

## 🔐 Security

Packet Picnic keeps sensitive operations on the server wherever possible.

* Cloudinary API secrets are stored on the backend.
* Upload signatures are generated server-side.
* Protected dashboard routes require authentication.
* File ownership is associated with authenticated users.
* Unique file identifiers are generated using `nanoid`.

---

## 📡 API Overview

| Method | Endpoint                           | Description                          |
| ------ | ---------------------------------- | ------------------------------------ |
| `POST` | `/api/v1/files/upload/signature`   | Generate Cloudinary upload signature |
| `POST` | `/api/v1/files`                    | Save uploaded file metadata          |
| `GET`  | `/api/v1/files/:uniqueId`          | Get shared file information          |
| `GET`  | `/api/v1/files/:uniqueId/download` | Generate download URL                |
| `GET`  | `/api/v1/files/get-all-files`      | Get authenticated user's files       |

---

## 🎨 UI

Packet Picnic uses a clean, minimal interface designed around quick file sharing.

The main areas include:

* Landing page
* Authentication
* Dashboard
* File list
* Shared file page
* Trash management

---

## 📌 Project Status

**In Development**

Packet Picnic is an actively developed full-stack project. New features and improvements are being added as development continues.

---

## 📄 License

This project is currently developed for educational and portfolio purposes.