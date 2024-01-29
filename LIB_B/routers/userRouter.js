const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const {
  registerUser,
  loginUser,
  validateToken,
} = UserController;
const authenticate = require('../middleware/authenticate.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/validateToken', authenticate, validateToken);

module.exports = router;