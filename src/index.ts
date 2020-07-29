import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
require('dotenv').config();

const app = express();
const port = 3030 || process.env.PORT;
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://website.com',
  `http://localhost:${port}`,
];

/* Importing routers */
const authRouter = require('./routes/auth-route');
const workoutRouter = require('./routes/workout-route');
const wgerRouter = require('./routes/wger-route');

/* Middleware */

app.use(helmet()); // best security HTTP configs
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-'],
  })
); // for cross domain clientside-server communication

app.use(express.json());
app.use(compression());

/* Establishing MongoDB connection and then starting up server */

(async () => {
  const mongoUtil = require('./utility/mongoUtil');
  await mongoUtil.connectToServer;

  /* Routes */
  app.use('/api/auth', authRouter);
  app.use('/api/routine', workoutRouter);
  app.use('/api/info', wgerRouter);

  app.get('/', async (req, res) => {
    try {
      res.status(202).send('[GV79] GymTrack API');
    } catch (err) {
      res.status(404).send();
    }
  });

  /* Starting server */
  app.listen(port, () => {
    console.log(`Starting server on localhost:${port}`);
  });
})().catch((err) => console.log(err));
