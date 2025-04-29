const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// POST new product
router.post("/", async (req, res) => {
  try {
    const db = req.database;
    const productData = req.body;

    // Simple validation
    if (!productData.name || !productData.price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    // Insert the new product
    const result = await db.collection("products").insertOne(productData);
    res.status(201).json({ id: result.insertedId, message: "Product created successfully" });
  } catch (err) {
    console.error("Create product failed:", err.message);
    res.status(500).json({ error: "Product creation failed" });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const db = req.database;
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    console.error("Fetch products error:", err.message);
    res.status(500).json({ error: "Cannot retrieve products" });
  }
});

// GET one product by ID
router.get("/:id", async (req, res) => {
  try {
    const db = req.database;
    const product = await db.collection("products").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("Fetch product error:", err.message);
    res.status(500).json({ error: "Error fetching product" });
  }
});

// PUT update product by ID
router.put("/:id", async (req, res) => {
  try {
    const db = req.database;
    const updateData = req.body;

    // Check if the product data includes required fields
    if (!updateData.name && !updateData.price) {
      return res.status(400).json({ error: "Name or price must be provided to update" });
    }

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updateData }
    );

    if (!result.matchedCount) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    console.error("Update product error:", err.message);
    res.status(500).json({ error: "Product update failed" });
  }
});

// DELETE product by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = req.database;

    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (!result.deletedCount) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err.message);
    res.status(500).json({ error: "Product deletion failed" });
  }
});

module.exports = router;