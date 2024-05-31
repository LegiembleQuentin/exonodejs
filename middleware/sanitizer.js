const sanitizeUserData = (req, res, next) => {
    const originalJson = res.json;

    res.json = function (data) {
        if (Array.isArray(data)) {
            data = data.map(user => {
                if (user && typeof user === 'object') {
                    delete user.password;
                    delete user.resetToken;
                    delete user.resetTokenExpires;
                }
                return user;
            });
        } else if (data && typeof data === 'object') {
            delete data.password;
            delete data.resetToken;
            delete data.resetTokenExpires;
        }
        originalJson.call(this, data);
    };

    next();
};

module.exports = sanitizeUserData;
