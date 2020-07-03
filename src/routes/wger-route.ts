import express, { response } from 'express';
import admin from '../utility/auth';
import { handleError } from '../utility/response-handler';
import axios from 'axios';

const router = express.Router();

/* For grabbing data from wger API (for exercise data and information) */

router.post('/', async (req, res) => {
  try {
    console.log('hello');
    // const { token } = req.body;
    // const user = await admin.auth().verifyIdToken(token);
    const response = await axios.get('https://wger.de/api/v2/exercise/', {
      headers: {
        Authorization: `Token ${process.env.WGER_API_KEY}`,
      },
    });
    console.log(response.data);
    res.status(200).send();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
