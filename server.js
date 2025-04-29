const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 4000;
const DB_URI = process.env.MONGODB_URI;
const DB_NAME = "myAppDatabase";

app.use(express.json()); // Middleware to parse JSON bodies

// Add route handlers
app.get("/", (req, res) => {
  res.send("Welcome to the API! Use /api/users or /api/products");
});

const client = new MongoClient(DB_URI);

async function init() {
  try {
    await client.connect();
    console.log("📡 Connected to MongoDB");
    const db = client.db(DB_NAME);

    // Attach the database to the request object for use in routes
    app.use((req, res, next) => {
      req.database = db;
      next();
    });

    app.use("/api/users", usersRoutes);
    app.use("/api/products", productsRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });

    // Handle termination signals gracefully
    process.on("SIGINT", async () => {
      await client.close();
      console.log("❌ MongoDB connection closed");
      process.exit(0);
    });
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
}

init();

// Global error handler for invalid JSON and server errors
app.use((err, req, res, next) => {
  // Invalid JSON handling
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON:", err.message);
    return res.status(400).json({ error: "Invalid JSON format" });
  }

  // Catch all other errors (server errors, etc.)
  console.error("Server error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});