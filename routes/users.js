const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

// GET /api/users?name=...
router.get("/", async (req, res) => {
  try {
    const db = req.database;
    const usersCollection = db.collection("users");
    const { name } = req.query;

    // Check if the users collection is empty and insert sample users
    const existingUsers = await usersCollection.countDocuments();
    if (existingUsers === 0) {
      await usersCollection.insertMany([
        { id: 101, name: "Sara", age: 22 },
        { id: 102, name: "Ahmed", age: 27 },
        { id: 103, name: "Sara Nasser", age: 29 },
      ]);
    }

    // Query to filter users by name if the 'name' query parameter is provided
    const query = name
      ? { name: { $regex: new RegExp(name, "i") } }  // Case-insensitive search for 'name'
      : {}; // If no name query is provided, fetch all users

    // Retrieve users matching the query
    const users = await usersCollection.find(query).toArray();
    res.json(users);
  } catch (err) {
    console.error("User fetch failed:", err.message);
    res.status(500).json({ error: "Could not fetch users" });
  }
});

// GET /api/users/:id - Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const db = req.database;
    const usersCollection = db.collection("users");
    
    // Attempt to fetch user by id (assuming 'id' is a number)
    const user = await usersCollection.findOne({ id: parseInt(req.params.id) });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Fetch user error:", err.message);
    res.status(500).json({ error: "Error fetching user" });
  }
});

module.exports = router;