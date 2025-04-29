# Express + MongoDB API Project

A simple Node.js backend built with **Express** and **MongoDB** to demonstrate basic CRUD operations and filtering.

## 📦 Features

- **Filter users by name** (`/api/users?name=...`)
- **Error handling middleware** for invalid requests (e.g., invalid JSON, server errors)
- **CRUD operations on `products` collection**:
  - Create new product
  - Read all or single product
  - Update product by ID
  - Delete product by ID

## 🧪 Example Endpoints

- **GET** `/api/users?name=Ali` — Filters users with "Ali" in their name.
- **POST** `/api/products` — Add a new product (requires `name` and `price`).
- **GET** `/api/products` — List all products.
- **GET** `/api/products/:id` — Get a single product by ID.
- **PUT** `/api/products/:id` — Update a product by ID.
- **DELETE** `/api/products/:id` — Delete a product by ID.

## 🛠 Setup Instructions

1. **Clone this repository**:
  git clone https://github.com/yourusername/express-mongo-api.git
  
Navigate to the project directory:
  cd express-mongo-api

Install dependencies:
  npm install

Create a .env file in the root directory and add your MongoDB URI and port number:
  MONGODB_URI=your-mongodb-connection-string
  PORT=4000

Run the server:
  npm start
  The server will start on http://localhost:4000.
---

## 🚀 Environment Variables
  - Make sure to replace the MongoDB connection string in the .env file with your actual MongoDB URI. This helps to keep sensitive information, like the database credentials, secure.

Example .env file:
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
  PORT=4000
---

## 📝 Notes
  - Error Handling: Invalid requests (such as malformed JSON) are handled by the error middleware, which returns appropriate error messages.

  - Sample Data: The users collection is seeded with a few sample users if the collection is empty on first access.

## 💡 Next Steps
  - Explore the MongoDB Atlas dashboard for more features, such as database management and manual queries.
  - Consider using Mongoose for data modeling and validation in future development.