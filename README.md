# 🛍️ Product Management App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing products, including features like image upload, search, filter, pagination, and CRUD operations.

## 📦 Features

- RESTful API for managing products
- Multer for image upload handling
- MongoDB integration with Mongoose
- Modular architecture (controllers, services, repositories)
- Environment-based config handling
- Basic validation and error handling

## 📦 Installation

### 1. Clone the repository

Backend
git clone https://github.com/Abinsaj/QuickStock-Backend.git

## Backend Setup
cd backend
npm install

# Create a .env file
PORT=5678
MONGODB_URI=your_mongo_connection_string
CLIENT_URL=http://localhost:5173

# Start the server
npm run dev

## 📤 API Overview

Base URL: http://localhost:5000/api
* GET /products - List products (supports query params for search, filter, pagination)

* POST /products - Add new product (with image)

* PUT /products/:id - Update product

* DELETE /products/:id - Delete product

* GET /products/:id - Get product details

Images are uploaded as multipart/form-data using multer

## 📁 Folder Structure

/backend
  /src
    /controllers         
    /routes              
    /models              
    /middleware          
    /config              
    /enums               
    /repository          
    /service 