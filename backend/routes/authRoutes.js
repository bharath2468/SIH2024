const express = require('express');
const { signup, login, verifyOtp } = require('../controllers/authController'); // Ensure this path is correct
const router = express.Router();

router.post('/signup', signup); // Verify if 'signup' is defined and correctly imported
router.post('/login', login);   // Verify if 'login' is defined and correctly imported
router.post('/verify-otp', verifyOtp); // Verify if 'verifyOtp' is defined and correctly imported

module.exports = router;

