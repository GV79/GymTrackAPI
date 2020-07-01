import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

const app = express();
const port = 3030 || process.env.PORT;
const allowedOrigins = ['http://localhost:3000', 'http://website.com', `http://localhost:${port}`];

/* MongoDB connection */

/* Importing routers */
const authRouter = require('./routes/auth-route.ts');
const workoutRouter = require('./routes/workout-route.ts');

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

/* Routes */
app.use('/api/auth', authRouter);
app.use('/api/routine', workoutRouter);

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
