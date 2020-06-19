/* Firebase Setup */

import * as admin from 'firebase-admin';

const serviceAccount = require('../../firebase/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gymtrack-e6a77.firebaseio.com',
});

export default admin;
