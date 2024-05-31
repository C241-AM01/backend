// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mobileRoutes = require('./Routes/mobileRoute');
const staticRoutes = require('./Routes/staticRoute');
const authRoutes = require('./Routes/authRoute');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/', mobileRoutes); 
app.use('/', staticRoutes); 
app.use('/', authRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
