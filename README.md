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
- [Getting Started](#-getting-started)
- [Environment Variables](#️-environment-variables)
- [Deployment](#️-deployment)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Screenshots](#️-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

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
