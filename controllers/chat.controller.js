const Chat = require('../models/chat.model');
const { validationResult } = require('express-validator');

exports.sendMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { receiver, message } = req.body;
    const sender = req.user.id;

    try {
        const chat = new Chat({ sender, receiver, message });
        await chat.save();
        res.json(chat);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getMessages = async (req, res) => {
    try {
        const chats = await Chat.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] });
        res.json(chats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
