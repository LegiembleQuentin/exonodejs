const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], authController.register);

router.post('/login', [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty()
], authController.login);

module.exports = router;
