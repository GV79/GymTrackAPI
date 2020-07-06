import express, { response } from 'express';
import admin from '../utility/auth';
import { handleError } from '../utility/response-handler';
import axios from 'axios';

const router = express.Router();

/* For grabbing data from wger API (for exercise data and information) */

router.post('/', async (_req, res) => {
  try {
    const response = await axios.get('https://wger.de/api/v2/exercise/?limit=800', {
      headers: {
        Authorization: `Token ${process.env.WGER_API_KEY}`,
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
