import express from 'express';
import { handleError } from '../utility/response-handler';
import admin from '../utility/auth';
import client from '../utility/database';

const router = express.Router();

router.put('/', async (req, res) => {
  try {
    const { name, description, token } = req.body;

    const user = await admin.auth().verifyIdToken(token);
    client.connect(async (err: any) => {
      if (err) throw new Error('Database connection could not be established.');
      const routinesCollection = client.db('db').collection('routines');
      const usersCollection = client.db('db').collection('users');

      const record = await routinesCollection.insertOne({
        name,
        date: new Date(),
        description,
        token,
        userId: user.user_id,
        userEmail: user.email,
        workouts: {
          monday: {
            exercises: [],
          },
          tuesday: {
            exercises: [],
          },
          wednesday: {
            exercuses: [],
          },
          thursday: {
            exercuses: [],
          },
          friday: {
            exercuses: [],
          },
        },
      });

      await usersCollection.update({ userId: user.user_id }, { $set: { routine: record.insertedId } });

      client.close();
    });
    res.status(202).send();
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

router.get('/', async (req, res) => {
  try {
    const token = req.query.token;

    if (typeof token !== 'string') {
      throw new Error('Invalid token');
    }

    const user = await admin.auth().verifyIdToken(token);

    client.connect(async (err: any) => {
      if (err) throw new Error('Database connection could not be established.');
      const routinesCollection = client.db('db').collection('routines');
      const usersCollection = client.db('db').collection('users');

      const routines = await routinesCollection.find({ userId: user.user_id }).toArray();
      const [userData] = await usersCollection.find({ userId: user.user_id }).toArray();

      client.close();
      res.status(202).json({ routines: JSON.stringify(routines), selectedRoutine: userData.routine });
    });
  } catch (err) {
    const { status, message } = handleError(err);
    res.status(status).json({ message });
  }
});

module.exports = router;
