const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authentication');

// Define routes for user authentication
router.post('/authenticate', authenticationController.authenticateUser);

module.exports = router;
