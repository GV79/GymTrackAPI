require('dotenv').config();
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

const app = express();
const port = 3030;
const allowedOrigins = [
  'http://localhost:3000',
  `http://localhost:${port}`,
  process.env.NODE_ENV === 'production' ? 'https://infallible-blackwell-0b463a.netlify.app' : '',
];

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
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter); // API rate limiting

/* Importing routers */
const authRouter = require('./routes/auth-route');
const workoutRouter = require('./routes/workout-route');
const wgerRouter = require('./routes/wger-route');

/* Establishing MongoDB connection and then starting up server */

(async () => {
  const mongoUtil = require('./utility/mongoUtil');
  await mongoUtil.connectToServer;

  /* Routes */
  app.use('/api/auth', authRouter);
  app.use('/api/routine', workoutRouter);
  app.use('/api/info', wgerRouter);

  app.get('/', (req, res) => {
    res.status(202).send('[GV79] GymTrack API');
  });

  /* Starting server */
  app.listen(process.env.PORT || port, () => {
    console.log(`Starting server on localhost:${port}`);
  });
})().catch((err) => console.log(err));
