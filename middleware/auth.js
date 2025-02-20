const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send('Forbidden');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = authenticateJWT;
