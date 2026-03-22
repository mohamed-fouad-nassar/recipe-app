# Backend

## 🏗️ Project Architecture (Clean Architecture)

```bash
backend/
 ├─ common/
 │   ├── config/
 │   ├── constants/
 │   ├── middlewares/
 │   ├── utils/
 │   ├── validations/
 ├─ modules/
 │   ├── auth/
 │   ├── comment/
 │   ├── favorite/
 │   ├── like/
 │   ├── profile/
 │   ├── user/
 │   ├── recipe/
```

---

## 🧾 Database Design

### 👤 User

```bash
{
  _id,
  name,
  email,
  password,
  avatar,
  role,
  createdAt
  updatedAt
}
```

---

### 🍲 Recipe

```bash
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
  createdAt
  updatedAt
}
```

---

### 💬 Comment

```bash
{
  _id,
  recipeId,
  userId,
  content,
  createdAt
}
```

---

## 🔌 API Endpoints

### Auth

```bash
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
```

---

### Recipes

```bash
GET    /api/recipes
POST   /api/recipes
GET    /api/recipes/:id
PATCH  /api/recipes/:id
DELETE /api/recipes/:id
```

---

### Favorites

```bash
GET   /api/favorites
POST   /api/favorites/:id
DELETE /api/favorites/:id
```

---

### Likes

```bash
GET   /api/likes
POST   /api/likes/:id
DELETE /api/likes/:id
```

---

### Comments

```bash
GET   /api/comments/:recipeId
POST   /api/comments/:recipeId
GET    /api/comments/:commentId
PATCH    /api/comments/:commentId
DELETE    /api/comments/:commentId
```

---

### Profile

```bash
GET   /api/profile
GET   /api/profile/:userId
```

---

## 🔐 Security

- Password hashing (bcrypt.js)
- JWT authentication
- Refresh token rotation
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

## 📦 Getting Started

### 1. Install dependencies

```bash
cd backend
npm install
```

---

### 2. Environment Variables

Create a `.env` file in backend:

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_TOKEN_EXPIRY="15m"
JWT_REFRESH_TOKEN_EXPIRY="10d"
TOKEN_SECRET=your_token_secret
CLOUDINARY_URL=your_cloudinary_url
```

---

### 3. Run the app

```bash
npm run dev
```

---

## 📌 Future Improvements

- Microservices architecture
- Mobile app (Ionic / React Native)
- AI-powered recipe suggestions

---

## 👨‍💻 Author

Hi, I'm **Mohamed** 👋  
A Full Stack Developer specializing Mainly in **MEARN Stack** (MongoDB, Express, Angular, Node.js) but this project is part of ITI 9-month training in the **MEAN Stack** (MongoDB, Express, Angular, Node.js) as project of node.js and angular courses.

---

### 📫 Connect with Me

- GitHub: https://github.com/mohamed-fouad-nassar
- Portfolio: https://mohamed-fouad-nassar.vercel.app
- LinkedIn: https://www.linkedin.com/in/mohammed-f-nassar
- Email: mohammednassar740@gmail.com
