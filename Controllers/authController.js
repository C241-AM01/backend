const admin = require('firebase-admin');
const { generateToken, invalidateToken, isTokenActive, verifyToken } = require('../Utils/jwt');

async function signUp(req, res) {
    try {
        const { email, password, role } = req.body;
        const userResponse = await admin.auth().createUser({
            email,
            password,
            emailVerified: false,
            disabled: false
        });

        await admin.auth().setCustomUserClaims(userResponse.uid, { role });

        res.json(userResponse);
    } catch (error) {
        console.error("Error signing up user:", error);
        res.status(500).json({ error: "Error signing up user" });
    }
}

async function logIn(req, res) {
    const { email, password } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
 
        const customClaims = (await admin.auth().getUser(userRecord.uid)).customClaims;
        const role = customClaims.role;

        const token = generateToken({ uid: userRecord.uid, email: userRecord.email, role });

        res.json({ token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(401).json({ error: "Invalid email or password" });
    }
}

async function logOut(req, res) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token && isTokenActive(token)) {
        invalidateToken(token);
        res.json({ message: "Logged out successfully" });
    } else {
        res.status(400).json({ error: "User not logged in or invalid token" });
    }
}

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        try {
            const user = verifyToken(token);
            if (isTokenActive(token)) {
                req.user = user;
                next();
            } else {
                res.sendStatus(403);
            }
        } catch (err) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
}

function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            next();
        } else {
            res.sendStatus(403);
        }
    };
}

module.exports = {
    signUp,
    logIn,
    logOut,
    authenticateJWT,
    authorizeRole
};
