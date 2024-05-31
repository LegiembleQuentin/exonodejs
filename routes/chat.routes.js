const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const auth = require('../middleware/auth');

router.post('/send', [
    auth,
    check('receiver', 'Receiver is required').notEmpty(),
    check('message', 'Message is required').notEmpty()
], chatController.sendMessage);

router.get('/messages', auth, chatController.getMessages);

module.exports = router;
