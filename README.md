# 🍽️ Online Food Ordering System

A full-stack MERN (MongoDB, Express, React, Node.js) web application that delivers a seamless food ordering experience — from browsing menus to secure payments.

Designed with real-world scalability in mind, this project showcases production-level architecture, authentication, payment integration, and admin management.

---

## ✨ Key Features

### 👤 User Panel
- 🔐 JWT-based Authentication (Login / Signup)
- 🍔 Browse food items by category
- 🔎 Search functionality
- 🛒 Add / Remove items from cart
- 💳 Secure Stripe payment integration
- 💵 Cash on Delivery (COD) option
- 📦 Order placement & tracking
- 📜 Order history

---

### 🛠️ Admin Panel
- ➕ Add new food items
- 🖼️ Upload food images (Multer)
- ❌ Delete food items
- 📦 Manage all orders
- 🔄 Update order status
  - Processing
  - Out for Delivery
  - Delivered

---

## 🏗️ Project Structure

Online_Food_Ordering/

├── Backend/      # Node.js + Express + MongoDB API  
├── Frontend/     # React (Vite) User Interface  
├── admin/        # Admin Dashboard (React)  
└── README.md  

---

## ⚙️ Tech Stack

### 🚀 Frontend
- React.js (Vite)
- CSS
- Axios
- React Router

### 🔧 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stripe Payment Gateway
- Multer (Image Upload)
- CORS
- dotenv

---

## 🔐 Authentication & Security

- JSON Web Token (JWT) authentication
- Token stored securely in localStorage
- Protected routes for sensitive actions
- Backend validation for all APIs

---

## 💳 Payment Integration

- Integrated Stripe Payment Gateway

Supports:
- Online Payment
- Cash on Delivery (COD)

- Payment verification system for order confirmation

---

## 📦 API Endpoints

### 🥗 Food Routes
POST   /api/food/add  
GET    /api/food/list  
POST   /api/food/remove  

### 🛒 Cart Routes
POST   /api/cart/add  
POST   /api/cart/remove  

### 📦 Order Routes
POST   /api/order/place  
POST   /api/order/place-cod  
POST   /api/order/verify  
POST   /api/order/userorders  
GET    /api/order/list  
POST   /api/order/status  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
git clone https://github.com/shivam3687/Online_Food_Ordering.git  
cd Online_Food_Ordering  

---

### 2️⃣ Backend Setup
cd Backend  
npm install  
npm run dev  

Create .env file in Backend:

PORT=4000  
MONGODB_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
STRIPE_SECRET_KEY=your_stripe_secret_key  

---

### 3️⃣ Frontend Setup
cd Frontend  
npm install  
npm run dev  

---

### 4️⃣ Admin Panel Setup
cd admin  
npm install  
npm run dev  

---

## 🗄️ Database Schema

### 📦 Order Schema Includes:
- userId
- items
- amount
- address
- status
- payment
- date

---

## 📸 Screenshots

Add screenshots inside /screenshots folder:

/screenshots/home.png  
/screenshots/cart.png  
/screenshots/orders.png  

---

## 🎯 Highlights

✔️ Full-stack MERN architecture  
✔️ RESTful API design  
✔️ Secure authentication system  
✔️ Stripe payment integration  
✔️ Dynamic cart functionality  
✔️ Admin dashboard control  
✔️ Image upload support  
✔️ Scalable backend structure  

---

## 🧠 Learning Outcomes

- End-to-end full-stack development
- Payment gateway integration (Stripe)
- REST API design & testing
- MongoDB schema design
- Authentication & authorization
- Debugging real-world applications

---

## 🚀 Future Enhancements

- 💳 Razorpay integration
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
