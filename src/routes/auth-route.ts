import express from 'express';
import admin from '../utility/auth';
import { handleError } from '../utility/response-handler';

const router = express.Router();

/* Login and logout handled on clientside React application */

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    await admin.auth().createUser({
      email,
      emailVerified: false,
      password: password,
      displayName: email.split(0, email.indexOf('@'))[0],
      disabled: false,
    });
    res.status(202).send();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
