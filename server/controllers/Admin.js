const User = require("../models/User");

exports.adminDashboard = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Welcome to the Admin Dashboard!",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error loading Admin Dashboard.",
    });
  }
};

// New function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("additionalDetails").exec(); // Fetch all users
    return res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users.",
    });
  }
};