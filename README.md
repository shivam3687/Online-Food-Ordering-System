# 🍽️ Online Food Ordering System

A complete MERN web application with separate User, Admin, and Backend services.
This repository supports local development and Render deployment for all three services.

---

## 🌟 What’s inside

- `Backend/` — Express API with MongoDB, authentication, Stripe, and image upload support
- `Frontend/` — React user-facing website built with Vite
- `admin/` — React admin dashboard to manage menu items and orders
- `render.yaml` — Render deployment manifest for Backend, Frontend, and Admin
- `.env.example` files in each service for environment variable setup

---

## 🚀 Project Features

### User App
- JWT authentication (login/signup)
- Browse food items by category
- Search food menu
- Add/remove items from cart
- Stripe payment flow
- Cash on Delivery option
- View order status and history

### Admin App
- Add new food items
- Upload food images using Multer
- Delete menu items
- View and update orders
- Change order status

### Backend API
- MongoDB Atlas-ready database connection
- Secure environment variable usage
- CORS configured for deployed frontend/admin
- Uses `process.env.PORT` and `process.env.MONGODB_URI`

---

## 📁 Repository Structure

```
ONLINE FOOD ORDERING WEBSITE/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   ├── server.js
│   └── .env.example
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── .env.example
├── admin/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── ...
├── render.yaml
└── README.md
```

---

## ✅ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/shivam3687/Online_Food_Ordering.git
cmpd "d:\Desktop\ONLINE FOOD ORDERING WEBSITE (2)\ONLINE FOOD ORDERING WEBSITE"
```

### 2. Backend

```bash
cd Backend
npm install
npm run dev
```

Create `Backend/.env` from `Backend/.env.example`:

```env
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:4173
```

> `FRONTEND_URL` and `ADMIN_URL` are used for CORS and Stripe redirect origins.

### 3. Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

Create `Frontend/.env` from `Frontend/.env.example`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### 4. Admin

```bash
cd ../admin
npm install
npm run dev
```

Create `admin/.env` from `admin/.env.example`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🌍 Render Deployment

This project includes `render.yaml` to deploy all services on Render.

### Backend service
- Root: `Backend`
- Environment: `Node`
- Build command: `npm install`
- Start command: `npm start`
- Env vars:
  - `MONGODB_URI`
  - `STRIPE_SECRET_KEY`
  - `FRONTEND_URL=https://<your-frontend-service>.onrender.com`
  - `ADMIN_URL=https://<your-admin-service>.onrender.com`

### Frontend service
- Root: `Frontend`
- Environment: `Static Site`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Env var:
  - `VITE_BACKEND_URL=https://<your-backend-service>.onrender.com`

### Admin service
- Root: `admin`
- Environment: `Static Site`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Env var:
  - `VITE_BACKEND_URL=https://<your-backend-service>.onrender.com`

---

## 🔧 Backend Environment Variables

From `Backend/.env.example`:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=https://your-frontend-service-name.onrender.com
ADMIN_URL=https://your-admin-service-name.onrender.com
```

---

## 📦 API Endpoints

### Food
- `POST /api/food/add`
- `GET /api/food/list`
- `POST /api/food/remove`

### Cart
- `POST /api/cart/add`
- `POST /api/cart/remove`

### Orders
- `POST /api/order/place`
- `POST /api/order/place-cod`
- `POST /api/order/verify`
- `POST /api/order/userorders`
- `GET /api/order/list`
- `POST /api/order/status`

---

## ⚠️ Notes and Troubleshooting

- `uploads/` is served from the backend but Render filesystem is ephemeral. For production, use Cloudinary or another cloud storage for uploaded images.
- If food items do not display, verify that MongoDB Atlas has data and the backend returns items from `/api/food/list`.
- If CORS blocks requests, ensure `FRONTEND_URL` and `ADMIN_URL` are set correctly in the backend env.

---

## 📌 Helpful Tips

- Use `Frontend/.env.example` and `admin/.env.example` as templates.
- Do not commit `.env` files — `.gitignore` already excludes them.
- Deploy backend first, then set frontend/admin `VITE_BACKEND_URL` to the backend's Render URL.

---

## 💡 Recommended Improvements

- Move file uploads to Cloudinary or S3
- Add better error handling and validation
- Improve admin UI for order filtering
- Add user profile and address management

---

## 🧾 License

This project is provided as-is for learning and deployment practice.

- 📧 Email notifications
- 📊 Admin analytics dashboard
- ☁️ Deployment on AWS / Render
- 🐳 Docker containerization

---

## 👨‍💻 Author

Shivam Kumar  
B.E. Computer Science Engineering  
Chandigarh University  

📧 Email: shivam202kmr@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/shivam-kumar-3876972b6/
