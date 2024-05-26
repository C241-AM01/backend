import express from 'express';
import cors from 'cors';

import assetRoute from './Routes/assetRoute.js';
import config from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/', assetRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);