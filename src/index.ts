import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import admin from './utility/auth';

const app = express();
const port = 3030 || process.env.PORT;

/* MongoDB connection */

/* Importing routers */
const authRouter = require('./routes/auth-route.ts');

/* Middleware */

app.use(helmet()); // best security HTTP configs
app.use(
  cors({
    origin: [`http://localhost:${port}`],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
); // for cross domain clientside-server communication
app.use(express.json());
app.use(compression());

/* Routes */
app.use('/api/auth', authRouter);

app.get('/user/:uid', async (req, res) => {
  try {
    const uid = req.params.uid || '';
    const userRecord = await admin.auth().getUser(uid);
    console.log('Successfully fetched user data:', userRecord.toJSON());
    res.status(202).send();
  } catch (err) {
    console.log('Error fetching user data:', err);
    res.status(404).send();
  }
});

/* Starting server */
app.listen(port, () => {
  console.log(`Starting server on localhost:${port}`);
});
