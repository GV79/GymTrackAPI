import express from 'express';
import admin from '../utility/auth';
import client from '../utility/database';
import { handleError } from '../utility/response-handler';
import { verifyCredentials } from '../utility/validation';

const router = express.Router();

/* Login and logout handled on clientside React application */

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!verifyCredentials(email, password)) {
      throw new Error('Invalid credentials');
    }

    const user = await admin.auth().createUser({
      email,
      emailVerified: false,
      password: password,
      displayName: email.split(0, email.indexOf('@'))[0],
      disabled: false,
    });

    client.connect(async (err: any) => {
      if (err) throw new Error('Database connection could not be established.');
      const collection = client.db('db').collection('users');

      await collection.insertOne({
        userId: user.uid,
        routine: null,
      });

      client.close();
    });

    res.status(202).send();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
