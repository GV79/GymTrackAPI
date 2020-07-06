import express from 'express';
import admin from '../utility/auth';
import { handleError } from '../utility/response-handler';
import { verifyCredentials } from '../utility/validation';

const mongoUtil = require('../utility/mongoUtil');

const router = express.Router();

/* Signup via Firebase Admin module */

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

    const collection = mongoUtil.getDb().collection('users');
    await collection.insertOne({
      userId: user.uid,
      history: [],
      routine: null,
    });

    res.status(202).send();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
