# 🌍 UrbanFlow - Unified Public Transport System

UrbanFlow is a full-stack smart mobility platform built to simplify urban transport. UrbanFlow integrates real-time transit data, multi-modal route planning (Booking all the transport in your journy using a single ticket), QR-based ticketing, and payments—all in one sleek interface. The system supports users, employees (drivers, conductors), and administrators with role-based access control.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- Session-based login with UUID tokens
- Role-based access: `USER`, `ADMIN`, `EMPLOYEE`
- Signup, login, logout, profile retrieval

### 🚍 Public Transit (TfL GTFS Integration)
- View available transit modes (bus, train, metro, tram, ferry)
- Browse transit routes and stops using TfL Open API
- View real-time schedules by stop

### 🛩️ Route Planning (GraphHopper + OSM)
- Plan optimal routes between two locations
- Multi-modal journey planning (walk + bus + train)
- Simulated real-time ETA per stop

### 🎟️ Ticketing with QR Codes
- Book transit tickets
- Generate QR code for each ticket (ZXing)
- Validate QR codes on scan
- Cancel and view tickets

### 💳 Payments (Dummy Integration)
- Simulated checkout using Stripe & Razorpay (test mode)
- Transaction history and verification flow

### 💚 User Preferences
- Favorite routes
- View travel history
- Personalized dashboard experience

### 🛠️ Admin Panel
- Add/update/delete routes and stops
- View system diagnostics
- Restricted to admins only

### ⚙️ System Utilities
- `/api/system/health` – health check
- `/api/system/status` – server status with uptime/session info

---

## 💽 Tech Stack

### Backend
- **Spring Boot 3.4**, Java 21
- Spring Security, JPA, Validation
- MySQL, Redis (optional)
- ZXing for QR generation
- GraphHopper, TfL GTFS
- Stripe & Razorpay (Test Mode)
- Firebase & Twilio (Future-ready)

### Frontend
- **React 18 + Vite**
- React Router DOM
- Axios for HTTP
- Material UI + Bootstrap (hybrid design)
- Formik & Yup (form validation)
- Tailwind-compatible theme

---

## 🎨 Color Scheme

| Role       | Color               | Hex       |
|------------|---------------------|-----------|
| Primary    | Midnight Blue       | `#003366` |
| Primary    | Electric Cyan       | `#00AEEF` |
| Secondary  | Lime Green          | `#A4C639` |
| Secondary  | Bright Orange       | `#FF6600` |
| Accent     | Soft White          | `#F4F4F4` |
| Accent     | Charcoal Grey       | `#333333` |

---

## 📁 Project Structure

### Backend
```
/backend/UrbanFlow/
├── controller/
├── service/
├── repository/
├── model/
├── dto/
├── utils/
├── config/
└── UrbanFlowApplication.java
```

### Frontend
```
/frontend/
├── pages/
│   ├── Auth/
│   ├── Dashboard/
│   ├── Transit/
│   ├── Payments/
│   ├── Preferences/
│   └── Admin/
├── components/
├── services/
├── styles/
├── utils/
├── App.jsx
└── main.jsx
```

---

## 📦 API Endpoints

### 🔐 Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/profile`

### 🚍 Transit (TfL)
- `GET /api/transit/modes`
- `GET /api/transit/routes`
- `GET /api/transit/stops/{routeId}`
- `GET /api/transit/schedule/{stopId}`

### 🛩️ Routing
- `GET /api/routes/find`
- `GET /api/routes/multimodal`
- `GET /api/routes/liveETA/{stopId}`

### 🎟️ Ticketing
- `POST /api/tickets/book`
- `GET /api/tickets/myTickets`
- `POST /api/tickets/cancel/{ticketId}`
- `POST /api/tickets/generateQR/{ticketId}`
- `POST /api/tickets/validateQR`

### 💳 Payments
- `POST /api/payments/checkout`
- `POST /api/payments/verify`
- `GET /api/payments/history`

### 💚 User Preferences
- `POST /api/users/favoriteRoute/{routeId}`
- `GET /api/users/favorites`
- `GET /api/users/history`

### 🛠️ Admin
- `POST /api/admin/addRoute`
- `PUT /api/admin/updateRoute/{routeId}`
- `DELETE /api/admin/deleteRoute/{routeId}`
- `POST /api/admin/addStop/{routeId}`
- `DELETE /api/admin/deleteStop/{stopId}`

### ⚙️ System
- `GET /api/system/health`
- `GET /api/system/status`

---

## 🧪 Test Users

| Role      | Email                  | Password      |
|-----------|------------------------|---------------|
| User      | user1@example.com      | Password@123  |
| Admin     | admin@urban.com        | Admin@123     |
| Employee  | driver@urban.com       | Driver@123    |

---

## ⚙️ Setup Instructions

### 📌 Backend
```bash
# Navigate to backend and run
cd backend/UrbanFlow
./mvnw spring-boot:run
```
> Ensure MySQL is running and `application.properties` is properly configured.

### 💻 Frontend
```bash
# Navigate to frontend and run
cd frontend
npm install
npm run dev
```
> Vite dev server runs on [http://localhost:5173](http://localhost:5173)

---

## ✅ Validation Rules

- **Email**: must follow standard email format
- **Password**: must include at least 8 characters, with at least 1 letter and 1 number  
  Regex used: `^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$`

---


---


---

## 📬 Contact

Built by **Sujal Sharma**

- 📧 Email: [sujals.node@gmail.com](mailto:sujals.node@gmail.com)
- 🌐 GitHub: [@sujalsha](https://github.com/sujalsha)

