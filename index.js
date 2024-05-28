import express from 'express';
import cors from 'cors';

import assetRoute from './Routes/assetRoute.js';
import mobileRoute from './Routes/mobileRoute.js'; // Import mobile routes
import config from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/', assetRoute); // Asset routes
app.use('/', mobileRoute); // Mobile routes

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
