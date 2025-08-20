const { signUp } = require('../controllers/auth/signupController');

const authRoutes = require('express').Router();


authRoutes.post('/register',signUp)
module.exports = { authRoutes };