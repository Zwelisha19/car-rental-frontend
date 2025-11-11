# 🚗 DriveNow - Car Rental System

A full-stack car rental application built with React.js frontend and Node.js backend. Users can browse available vehicles, filter by various criteria, and make bookings, while admins can manage vehicles and bookings through a dedicated dashboard.

## 📋 Features

### Frontend (React.js)
- **User Interface**
  - Browse available vehicles with filtering
  - Search and filter by price range, vehicle type, transmission
  - Vehicle details and booking system
  - Responsive design for all devices
  - Modern UI with smooth animations

- **Admin Dashboard**
  - Vehicle management (add, edit, delete)
  - Booking management
  - Admin authentication

### Backend (Node.js/Express)
- **RESTful API**
  - Vehicle management endpoints
  - User authentication
  - Booking system
  - Admin routes
- **Database integration** (MongoDB)
- **CORS enabled** for frontend communication

## 🛠 Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS (styling)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- CORS
- dotenv


## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation & Running

#### 1. Clone the repository
```bash
git clone https://github.com/Zwelisha19/car-rental-frontend.git

```

#### 2. Setup
```bash
cd car-rental-frontend
npm install
npm run dev

# Frontend will run on http://localhost:5173/
```


## 📚 API Endpoints

### Vehicles
- `GET /api/vehicles` - Get all vehicles  
- `POST /api/vehicles` - Add new vehicle (Admin)  
- `PUT /api/vehicles/:id` - Update vehicle (Admin)  
- `DELETE /api/vehicles/:id` - Delete vehicle (Admin)  

### Bookings
- `GET /api/bookings` - Get all bookings  
- `POST /api/bookings` - Create new booking  
- `PUT /api/bookings/:id` - Update booking status  

### Authentication
- `POST /api/admin/login` - Admin login

## 🎯 Usage

### For Customers
1. Visit the homepage  
2. Browse available vehicles  
3. Use filters to find preferred cars  
4. Click "Book Now" to make a reservation  
5. Fill in booking details  

### For Admins
1. Navigate to `/admin/login`  
2. Login with admin credentials  
3. Access dashboard at `/admin/dashboard`  
4. Manage vehicles and bookings  






