# 🛍️ ShopNow — MERN Stack E-Commerce App

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). Inspired by Flipkart and Amazon, featuring a modern UI with animations, category filters, cart management, and JWT authentication.

---

## 🌐 Live Demo

| | Link |
|---|---|
| 🖥️ **Frontend** | [https://ecommerce-app-ten-wheat.vercel.app](https://ecommerce-app-ten-wheat.vercel.app) |
| 🔧 **Backend API** | [https://shopnow-backend-w9p7.onrender.com](https://shopnow-backend-w9p7.onrender.com) |
| 📦 **GitHub** | [github.com/Gouthamideraje24/ecommerce-app](https://github.com/Gouthamideraje24/ecommerce-app) |

---

## ✨ Features

### 👤 Customer Features
- 🔐 User Registration & Login with JWT Authentication
- 🛍️ Browse 54+ Products across 12 Categories
- 🔍 Search products by name and brand
- 🗂️ Filter by Category (Phones, Laptops, Audio, Gaming, etc.)
- 📊 Sort by Price and Rating
- ⭐ Star Ratings and Review Count
- 🛒 Add to Cart / Remove from Cart
- 💰 Dynamic Pricing with Discount Badges
- 📦 Order Placement and Order History
- 🇮🇳 Indian Rupee (₹) Pricing
- 📱 Fully Responsive Design
- 🎨 Smooth animations and hover effects

### 🔧 Admin Features
- ➕ Create / Edit / Delete Products
- 📋 View All Orders
- 👥 Manage Users
- 🔒 Role-Based Access Control (Admin / User)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI Framework |
| React Router DOM | 6 | Client-side Routing |
| Axios | Latest | HTTP API Requests |
| Context API | Built-in | State Management |
| Vite | Latest | Build Tool |
| Google Fonts | - | Syne + DM Sans Typography |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 22 | Runtime Environment |
| Express.js | 5 | Web Framework |
| MongoDB Atlas | Latest | Cloud Database |
| Mongoose | 9 | ODM for MongoDB |
| JWT | 9 | Authentication Tokens |
| bcryptjs | 3 | Password Hashing |
| CORS | 2 | Cross-Origin Requests |
| dotenv | 17 | Environment Variables |
| nodemon | 3 | Dev Auto-restart |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend Hosting |
| Render | Backend Hosting |
| MongoDB Atlas | Cloud Database |
| GitHub | Version Control |

---

## 📁 Project Structure

```
ecommerce-app/
├── client/                        # ⚛️  React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx         # Navigation bar with cart count
│   │   ├── pages/
│   │   │   ├── HomePage.jsx       # Product listing with filters
│   │   │   ├── LoginPage.jsx      # User login form
│   │   │   ├── RegisterPage.jsx   # User registration form
│   │   │   ├── ProductDetailPage.jsx  # Single product view
│   │   │   ├── CartPage.jsx       # Shopping cart with summary
│   │   │   └── OrdersPage.jsx     # User order history
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Auth state management
│   │   │   └── CartContext.jsx    # Cart state management
│   │   ├── services/
│   │   │   └── api.js             # Axios instance with interceptors
│   │   ├── App.jsx                # Route definitions
│   │   ├── main.jsx               # App entry point
│   │   └── index.css              # Global styles & animations
│   ├── index.html
│   └── package.json
│
├── server/                        # 🟢 Node.js Backend
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, Login, Profile
│   │   ├── productController.js   # CRUD for products
│   │   └── orderController.js     # Create and fetch orders
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT protect & admin check
│   │   └── errorHandler.js        # Global error handler
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Product.js             # Product schema with reviews
│   │   └── Order.js               # Order schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth
│   │   ├── productRoutes.js       # /api/products
│   │   └── orderRoutes.js         # /api/orders
│   ├── seeder.js                  # Database seeder (54 products)
│   ├── server.js                  # Express app entry point
│   ├── .env                       # Environment variables (gitignored)
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (free tier)
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/Gouthamideraje24/ecommerce-app.git
cd ecommerce-app
```

### 2. Setup Backend
```bash
cd server
npm install
```

### 3. Create `.env` file inside `server/` folder
```env
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Seed the Database with Sample Products
```bash
node seeder.js
```
Expected output:
```
MongoDB connected
Old products cleared
✅ 54 Products seeded successfully!
```

### 5. Start the Backend Server
```bash
npm run dev
```
Expected output:
```
Server running on port 5000
MongoDB connected: cluster0.xxxxx.mongodb.net
```

### 6. Setup Frontend (open a new terminal)
```bash
cd client
npm install
npm run dev
```

### 7. Open in Browser
```
http://localhost:5173
```

---

## 🔑 API Endpoints

### 🔐 Auth Routes — `/api/auth`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | /register | Register new user | Public |
| POST | /login | Login and get token | Public |
| GET | /profile | Get logged-in user profile | Private |

### 📦 Product Routes — `/api/products`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | / | Get all products | Public |
| GET | /:id | Get single product by ID | Public |
| POST | / | Create new product | Admin |
| PUT | /:id | Update product | Admin |
| DELETE | /:id | Delete product | Admin |

### 🧾 Order Routes — `/api/orders`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | / | Create new order | Private |
| GET | / | Get all orders | Admin |
| GET | /myorders | Get logged-in user orders | Private |
| GET | /:id | Get order by ID | Private |
| PUT | /:id/pay | Mark order as paid | Private |

---

## 🗄️ Database Schema

### User Model
```json
{
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (hashed with bcrypt)",
  "isAdmin": "Boolean (default: false)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Product Model
```json
{
  "user": "ObjectId (ref: User)",
  "name": "String (required)",
  "image": "String (URL)",
  "brand": "String",
  "category": "String",
  "description": "String",
  "price": "Number",
  "countInStock": "Number",
  "rating": "Number",
  "numReviews": "Number",
  "reviews": "Array of review objects"
}
```

### Order Model
```json
{
  "user": "ObjectId (ref: User)",
  "orderItems": "Array of products with qty",
  "shippingAddress": {
    "address": "String",
    "city": "String",
    "postalCode": "String",
    "country": "String"
  },
  "paymentMethod": "String",
  "itemsPrice": "Number",
  "shippingPrice": "Number",
  "taxPrice": "Number",
  "totalPrice": "Number",
  "isPaid": "Boolean",
  "isDelivered": "Boolean"
}
```

---

## 🎨 UI Highlights
- **Dark hero banner** with gradient and decorative animations
- **Sticky navbar** with blur effect on scroll
- **Product cards** with hover lift, image zoom, discount badges
- **Category filter pills** with smooth active state
- **Sort dropdown** for price and rating
- **Cart page** with order summary, tax and shipping calculation
- **Free shipping** banner for orders above ₹5000
- **Loading spinner** while fetching data
- **Responsive grid** layout (auto-fill columns)
- **Custom scrollbar** in brand orange color
- **Google Fonts** — Syne (headings) + DM Sans (body)
- **54 products** across 12 categories

---

## 🚀 Deployment

### Frontend → Vercel ✅
```
Live URL:       https://ecommerce-app-ten-wheat.vercel.app
Framework:      Vite
Root Directory: client
Build Command:  npm run build
Output:         dist/
```

### Backend → Render ✅
```
Live URL:       https://shopnow-backend-w9p7.onrender.com
Root Directory: server
Build Command:  npm install
Start Command:  node server.js
```

### Database → MongoDB Atlas ✅
```
Cloud hosted MongoDB
Cluster:        cluster0.l7go3bx.mongodb.net
Network Access: 0.0.0.0/0 (all IPs allowed)
```

---

## 📅 Internship Timeline

| Phase | Task | Deadline | Status |
|---|---|---|---|
| Phase 1 | Planning & Setup | Jan 30, 2026 | ✅ Done |
| Phase 2 | Frontend Development | Feb 6, 2026 | ✅ Done |
| Phase 3 | Backend & Database | Feb 27, 2026 | ✅ Done |
| Phase 4 | Deployment & Testing | Mar 13, 2026 | ✅ Done |
| Phase 5 | Documentation & Feedback | Mar 20, 2026 | ✅ Done |

---

## 📊 Evaluation Criteria

| Criteria | Weightage | Status |
|---|---|---|
| Frontend Implementation | 25% | ✅ Complete |
| Backend & APIs | 25% | ✅ Complete |
| Integration & Deployment | 20% | ✅ Complete |
| Code Quality & Structure | 15% | ✅ Complete |
| Documentation | 15% | ✅ Complete |

---

## 👩‍💻 Developer

**Gouthami Deraje**
- 🐙 GitHub: [@Gouthamideraje24](https://github.com/Gouthamideraje24)
- 🌐 Live App: [ecommerce-app-ten-wheat.vercel.app](https://ecommerce-app-ten-wheat.vercel.app)

---

## 🏢 Internship Details

> This project was built as part of the **Internage Full Stack Developer Internship Program**

- 🏫 **Organization:** Internage
- 👨‍🏫 **Mentor:** Vishwas Narayan
- ⏱️ **Duration:** 6–8 Weeks
- 💻 **Stack:** MERN (MongoDB, Express.js, React.js, Node.js)
- 🎯 **Goal:** Build and deploy a production-ready full stack web application

---

## 📄 License

MIT License — Free to use for learning and educational purposes.

---

<div align="center">
  <strong>⭐ Star this repo if you found it helpful!</strong><br/>
  Built with ❤️ using the MERN Stack<br/><br/>
  <a href="https://ecommerce-app-ten-wheat.vercel.app">🌐 View Live App</a> •
  <a href="https://github.com/Gouthamideraje24/ecommerce-app">📦 GitHub Repo</a> •
  <a href="https://shopnow-backend-w9p7.onrender.com">🔧 API</a>
</div>