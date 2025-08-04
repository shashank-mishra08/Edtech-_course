const express = require("express");
const router = express.Router();

// Import the required controllers and middleware functions
const { adminDashboard, getAllUsers } = require("../controllers/Admin");
const { auth, isAdmin } = require("../middlewares/auth");

// Admin Dashboard Route
router.get("/dashboard", auth, isAdmin, adminDashboard);

// Route to get all users
router.get("/users", auth, isAdmin, getAllUsers);

module.exports = router;