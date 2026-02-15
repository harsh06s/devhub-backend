const jwt = require ("jsonwebtoken");

const generateToken = (payload) => {
    return jwt.sign(payload, "DAY14_SECRET", {
        expiresIn: "100d",
    });
}

module.exports = generateToken ;