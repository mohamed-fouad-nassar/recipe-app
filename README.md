# 🍲 Recipe Sharing Platform (MEAN Stack)

A full-stack web application where users can create, share, and discover recipes. Built with the **MEAN stack (MongoDB, Express, Angular, Node.js)** and designed with **scalable architecture and production best practices**.

---

## 🚀 Features

### 👤 Authentication

- User registration & login
- JWT + Refresh Token system
- Role-based access (User / Admin)

---

### 🍲 Recipes

- Create, edit, delete recipes
- Upload recipe images
- Add ingredients & cooking steps
- Categorize recipes (e.g., Vegan, Dessert)

---

### 🔍 Search & Filtering

- Search recipes by title
- Filter by category or ingredients

---

### ❤️ Favorites

- Save / unsave recipes
- Personalized favorites list

---

### 💬 Comments

- Add comments to recipes
- View all comments per recipe

---

## 🧱 Tech Stack

### Frontend

- Angular
- RxJS
- Angular Router

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

### Other Tools

- Cloudinary (image upload)
- JWT (authentication)
- Redis (caching - optional)

---

## 🏗️ Project Architecture

### Backend Structure (Clean Architecture)

```
backend/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── models/
 ├── routes/
 ├── middlewares/
 └── utils/
```

---

### Frontend Structure (Angular)

```
src/app/
 ├── core/        (auth, interceptors)
 ├── shared/      (reusable components)
 ├── features/
 │    ├── auth/
 │    ├── recipes/
 │    ├── profile/
```

---

## 🧾 Database Design

### 👤 User

```js
{
  _id,
  name,
  email,
  password,
  avatar,
  role,
  favorites: [recipeId],
  createdAt
}
```

---

### 🍲 Recipe

```js
{
  _id,
  title,
  description,
  image,
  ingredients: [
    { name: String, quantity: String }
  ],
  steps: [String],
  category,
  createdBy: userId,
  likes: Number,
  createdAt
}
```

---

### 💬 Comment

```js
{
  (_id, recipeId, userId, text, createdAt);
}
```

---

## 🔌 API Endpoints

### Auth

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
```

---

### Recipes

```
GET    /api/recipes
GET    /api/recipes/:id
POST   /api/recipes
PATCH  /api/recipes/:id
DELETE /api/recipes/:id
```

---

### Favorites

```
POST   /api/recipes/:id/favorite
DELETE /api/recipes/:id/favorite
```

---

### Comments

```
POST   /api/recipes/:id/comments
GET    /api/recipes/:id/comments
```

---

## 🔐 Security

- Password hashing (bcrypt)
- JWT authentication
- Refresh token rotation
- Rate limiting
- Input validation & sanitization
- Helmet for HTTP security

---

## ⚡ Advanced Features (Planned)

- ⭐ Rating system (1–5 stars)
- 🧾 Meal planner (calendar-based)
- 🛒 Shopping list generator
- 🔔 Notifications system
- 📊 Admin analytics dashboard
- ⚡ Real-time comments (Socket.io)
- 🧠 Recommendation system

---

## 🐳 Deployment

- Nginx for serving Angular app
- MongoDB Atlas (cloud database)
- CI/CD (GitHub Actions)

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohamed-fouad-nassar/recipe-app.git
cd recipe-app
```

---

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

---

### 3. Environment Variables

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLOUDINARY_URL=your_cloudinary_url
```

---

### 4. Run the app

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
ng serve
```

---

## 🎯 Learning Goals

This project demonstrates:

- Clean backend architecture
- JWT authentication system
- Angular modular design
- RESTful API design
- Real-world full-stack practices

---

## 📌 Future Improvements

- Microservices architecture
- Mobile app (Ionic / React Native)
- AI-powered recipe suggestions
