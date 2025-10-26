#  Travel Hub - Airline Route Management System

A comprehensive full-stack web application for managing **airlines**, **airports**, **routes**, and **countries** with interactive map visualization.  
Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

##  Live Demo
🔗 [Travel Hub Live](https://travel-hub-indol.vercel.app/)

> ⚠️**Note:** Backend may take 30–50 seconds to wake up on the first request (free Render tier limitation).


##  Table of Contents
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#️-tech-stack)
- [Architecture](#️-architecture)
- [API Endpoints](#-api-endpoints)

---

## Features

###  Core Functionality
- **Interactive Dashboard** – Real-time statistics and visual analytics  
- **Google Maps Integration** – Interactive map showing all airports with clickable markers  
- **Airline Management** – Full CRUD with country associations  
- **Airport Management** – Create, update, and delete airports with automatic geocoding  
- **Route Management** – Define routes with automatic distance calculation using *Geolib*  
- **Country Management** – Organize and filter data by countries  
- **Soft Delete** – Safe deletion with restore option  
- **Advanced Filtering** – Filter routes by airline or airports by country  

###  Technical Highlights
- **Real-time Updates** – Instant data refresh after operations  
- **Automatic Distance Calculation** – Uses Haversine formula for accuracy  
- **Data Validation** – Comprehensive validation (frontend + backend)  
- **Responsive Design** – Optimized for both desktop and mobile  
- **Automatic Deployment** – CI/CD pipeline with GitHub integration  
- **Cloud Infrastructure** – Fully deployed on modern cloud platforms  

---

##  Demo

### 🔗 Live Application
[https://travel-hub-indol.vercel.app/](https://travel-hub-indol.vercel.app/)


## Tech Stack

###  Frontend
- React 18 – UI library  
- Vite – Build tool and dev server  
- React Router – Client-side routing  
- Axios – HTTP client for API requests  
- React Responsive Modal – Modal dialogs  
- React Select – Enhanced dropdowns  
- @react-google-maps/api – Google Maps integration  
- React Loading Indicators – Loading animations  
- SweetAlert2 – Alert notifications  

### Backend
- Node.js – JavaScript runtime  
- Express.js – Web framework  
- MongoDB – NoSQL database  
- Mongoose – ODM for MongoDB  
- Geolib – Geographic distance calculations  
- Axios – HTTP client for Google Geocoding API  
- dotenv – Environment variable management  
- CORS – Cross-origin resource sharing  

### Cloud & Deployment
- **Vercel** – Frontend hosting  
- **Render** – Backend hosting  
- **MongoDB Atlas** – Cloud database  
- **GitHub** – Version control & CI/CD  

### External APIs
- Google Maps JavaScript API – Interactive maps  
- Google Geocoding API – Airport location coordinates  


##  Architecture
┌─────────────┐
│   Client    │  (Browser)
└──────┬──────┘
       │  HTTPS
       ↓
┌─────────────┐
│   Vercel    │  (Frontend - React)
│  Frontend   │  https://travel-hub-indol.vercel.app
└──────┬──────┘
       │  REST API
       ↓
┌─────────────┐
│   Render    │  (Backend - Node.js / Express)
│   Backend   │  https://travel-hub-backend.onrender.com
└──────┬──────┘
       │  Mongoose (ODM)
       ↓
┌─────────────┐
│   MongoDB   │  (Database)
│    Atlas    │  (Cloud NoSQL Database)
└─────────────┘

## 📡 API Endpoints

###  Airlines
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/get-all-airlines` | Get all airlines |
| GET | `/api/get-all-airlines?airlineId=ID` | Get specific airline by ID |
| POST | `/api/create-airline` | Create new airline |
| PUT | `/api/update-airline` | Update airline |
| PUT | `/api/delete-airline/:id` | Soft delete airline |

###  Airports
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/get-airports` | Get all airports |
| GET | `/api/get-airports?countryId=ID` | Filter airports by country |
| POST | `/api/create-airport` | Create new airport |
| PUT | `/api/update-airport/:id` | Update airport |
| PUT | `/api/delete-airport/:id` | Soft delete airport |

### 🛤️ Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/get-all-routes` | Get all routes |
| GET | `/api/get-all-routes?airlineId=ID` | Filter routes by airline |
| GET | `/api/get-all-routes?includeDeleted=true` | Include deleted routes |
| POST | `/api/create-route` | Create new route |
| PUT | `/api/update-route` | Update route |
| PUT | `/api/delete-route/:id` | Soft delete route |

### 📊 Dashboard
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/get-all-lengths` | Get entity counts |
| GET | `/api/get-maps-config` | Get Maps API config |
| GET | `/api/get-all-countries-airports` | Get countries & airports |

