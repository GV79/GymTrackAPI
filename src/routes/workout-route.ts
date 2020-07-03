import express from 'express';
import { handleError } from '../utility/response-handler';
import admin from '../utility/auth';
import { RoutineObject } from './schema/types';

const mongoUtil = require('../utility/mongoUtil');

const router = express.Router();

/* Retrieving routines based on user ID */
router.get('/', async (req, res) => {
  try {
    const token = req.query.token;

    if (typeof token !== 'string') {
      throw new Error('Invalid token');
    }

    const user = await admin.auth().verifyIdToken(token);
    const db = mongoUtil.getDb();

    const routinesCollection = db.collection('routines');
    const usersCollection = db.collection('users');

    const routines = await routinesCollection.find({ userId: user.user_id }).toArray();
    const [userData] = await usersCollection.find({ userId: user.user_id }).toArray();

    res.status(202).json({ routines: JSON.stringify(routines), selectedRoutine: userData.routine });
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

/* For sharing routines */
router.get('/:id', async (req, res) => {
  try {
    // need to strip user data off routines JSON data by using delete myObj.test[keyToDelete];

    res.status(202).json();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

/* Creating routines */
router.put('/', async (req, res) => {
  try {
    const { name, description, token } = req.body;

    const user = await admin.auth().verifyIdToken(token);
    const db = mongoUtil.getDb();

    const routinesCollection = db.collection('routines');
    const usersCollection = db.collection('users');

    const routine: RoutineObject = {
      name,
      date: new Date(),
      description,
      token,
      userId: user.user_id,
      userEmail: user.email,
      workouts: {
        monday: {
          name: 'Monday',
          exercises: [],
        },
        tuesday: {
          name: 'Tuesday',
          exercises: [],
        },
        wednesday: {
          name: 'Wednesday',
          exercises: [],
        },
        thursday: {
          name: 'Thursday',
          exercises: [],
        },
        friday: {
          name: 'Friday',
          exercises: [],
        },
        saturday: {
          name: 'Saturday',
          exercises: [],
        },
        sunday: {
          name: 'Sunday',
          exercises: [],
        },
      },
    };

    const record = await routinesCollection.insertOne(routine);

    await usersCollection.updateOne({ userId: user.user_id }, { $set: { routine: record.insertedId } });
    res.status(202).send();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

/* Deleting Routine */
router.delete('/', async (req, res) => {
  try {
    const { id } = req.params; // routine ID
    res.status(202).send();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
