const express = require("express");
const cors = require("cors");   

const app = express();

app.use(cors());               

console.log("Starting backend server...");

app.get("/", (req, res) => {
  console.log("GET request received at /");
  res.send("Backend running successfully");
});

app.get("/api/products", (req, res) => {
  console.log("GET request received at /api/products");

  res.json([
    { id: 1, name: "Laptop", price: 55000, category: "Electronics" },
    { id: 2, name: "Mobile Phone", price: 20000, category: "Electronics" },
    { id: 3, name: "Headphones", price: 3000, category: "Accessories" }
  ]);
});

app.listen(5000, () => {
  console.log("🚀 Backend Server is RUNNING");
  console.log("🌐 Base URL: http://localhost:5000");
  console.log("🛒 Products API: http://localhost:5000/api/products");
});
