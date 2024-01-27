const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { registerUser,loginUser } = UserController;
const authenticate = require('../middleware/authenticate.js');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;