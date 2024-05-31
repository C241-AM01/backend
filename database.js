// database.js
const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccount = require('./tracky-6c6e0-firebase-adminsdk-o5101-2ef8a21e65.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

// Get a reference to your Firebase Realtime Database
const database = admin.database();

module.exports = database;
