Demo link : https://drive.google.com/file/d/1hd_e4luqY2GH-RYHfIANqdPeaQAlNzUi/view?usp=sharing


# Smart-City-Management-Platform

## Introduction

The ***Smart City Management Platform*** is a centralized digital solution for city administrators to monitor, analyze to improve urban infrastructure and public services.  
It integrates **real-time** and **historical data** from multiple city systems—such as ***traffic, energy, waste, and emergency services***—to provide actionable insights, predictive analytics, and instant alerts for efficient urban governance.

---
## Objectives

**Centralized Monitoring Dashboard** – Real-time view of traffic, air quality, waste, and utilities.
**Predictive Analytics & Insights** – Detect trends, optimize resources, and forecast events.
**Resource Allocation Optimization** – AI/ML-based recommendations for routing, energy balancing, and more.
**Role-Based Access & Security** – Admin, Operator, and Viewer roles with secure authentication.

---

## Key Features
### 1. **Admin Dashboard**
- Real-time monitoring of city services
- Interactive graphs, charts, and maps
- Emergency response control panel

### 2. **Analytics & Reports**
- Daily/Weekly/Monthly reports
- Predictive analytics for planning

### 3. **Optimization Modules**
- Traffic signal optimization
- Waste collection route planning
- Energy grid balancing

### 4. **Security & Access Control**
- Role-based dashboards (Admin, Environment Officer, Utility Officer, Traffic Control)
- JWT/OAuth authentication with secure storage

### 5. **Integration with City Systems**
- APIs for utilities, emergency services, and transport networks

---

## Tech Stack

| Component          | Technologies |
|--------------------|--------------|
| **Frontend**       | React.native |
| **Backend**        | Node.js + express.js|
| **Database**       | MongoDB| |
| **Visualization**  | Chart.js |
| **Auth**           | JWT  |



---
##  Project Structure

```  smart-city-management/
smart-city-management/
│
├── backend/                        # Backend APIs & business logic
│   ├── config/                     # DB connection & environment config
│   │   └── db.js
│   ├── controllers/                # API request handlers
│   │   └── authController.js
│   ├── middleware/                 # Authentication / security middleware
│   │   └── authMiddleware.js
│   ├── models/                     # Database schemas & models
│   │   └── User.js
│   ├── routes/                     # API endpoint definitions
│   │   └── authRoutes.js
│   ├── server.js                   # Main backend server entry point
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                       # Frontend mobile (React Native)
│   ├── src/
│   │   ├── api/                    # API call helpers
│   │   │   └── authApi.js
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ChartCard.js
│   │   │   └── CustomHeader.js
│   │   ├── context/                # Global auth context
│   │   │   └── AuthContext.js
│   │   ├── navigation/             # Navigation (stack/tab)
│   │   │   ├── AuthNavigator.js
│   │   │   └── TabNavigator.js
│   │   ├── screens/                # App screens
│   │   │   ├── LoginScreen.js
│   │   │   ├── SignupScreen.js
│   │   │   ├── DashboardScreen.js
│   │   │   ├── AirPollutionScreen.js
│   │   │   ├── AnalyticsScreen.js
│   │   │   ├── EmergencyDashboard.js
│   │   │   ├── EnergyDashboard.js
│   │   │   ├── TrafficDashboard.js
│   │   │   └── WasteDashboard.js
│   │   ├── styles/                 # Global UI styles
│   │   │   ├── globalStyles.js
│   │   │   └── theme.js
│   │   └── utils/                  # Helper functions
│   │       └── energy.js
│   ├── App.js
│   ├── index.js
│   ├── assets/                     # Images, fonts, icons
│   │   ├── adaptive-icon.png
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   ├── splash-icon.png
│   │   └── fonts/
│   │       └── Pacifico-Regular.ttf
│   ├── app.json
│   ├── package.json
│   └── package-lock.json
├── package.json                    # Root-level scripts / tools
└── README.md                       # Project overview


```

---

## Getting Started

###  Clone the repository
```
git clone https://github.com/your-username/smart-city-management.git
cd smart-city-management
```
### Backend Setup
```
cd backend
npm install
npm run dev
```

### Frontend Setup
```
cd frontend
npm install
npm start
```

### Environment Variables

## Backend .env
```
MONGO_URL=mongodb://localhost:27017/smart_city_applicatio
PORT=8000
JWT_SECRET=yoursecretkey
```
## Frontend .env
```
OPENWEATHER_API_KEY=***
TOMTOM_API_KEY=**
EMBER_API_URL=***
EMBER_API_KEY=***
TOMTOM_BASE_URL=***
OPENWEATHER_BASE_URL=**
ENERGY_URL=***
```

###  Security

- JWT-based authentication

- Role-based access control

- Encrypted password storage (bcrypt)

- HTTPS for secure data transfer

###  UI Preview

- Admin Dashboard – Real-time data with charts and maps
- Analytics Reports – Historical trends & predictions



