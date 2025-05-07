// Import the required modules
const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions, i.e handler functions

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// ================= Routes for Payment Processing =================
// Route for capturing payment
// Route for verifying payment
// Route for sending payment success email
router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment",auth, isStudent, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router