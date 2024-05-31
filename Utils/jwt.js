const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY; 
const activeTokens = new Set();

function generateToken(user) {
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    activeTokens.add(token);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

function invalidateToken(token) {
    activeTokens.delete(token);
}

function isTokenActive(token) {
    return activeTokens.has(token);
}

module.exports = {
    generateToken,
    verifyToken,
    invalidateToken,
    isTokenActive
};
