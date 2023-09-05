const express = require('express');
const router = express.Router();
const adminAuthenticationController = require('../controllers/adminAuthentication');

// Define routes for admin authentication
router.post('/admin/authenticate', adminAuthenticationController.authenticateAdmin);

module.exports = router;
