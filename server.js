// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mobileRoutes = require('./Routes/mobileRoute');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use('/', mobileRoutes); // Use the routes module

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
