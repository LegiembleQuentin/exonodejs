const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv').config();

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        let user = new User({ username, email, password });
        await user.save();

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
