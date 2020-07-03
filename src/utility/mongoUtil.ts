require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI;

let db: any = '';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {
  connectToServer: new Promise(async (resolve, reject) => {
    try {
      await client.connect();
      db = client.db('db');
      resolve();
    } catch (err) {
      reject(err);
    }
  }),

  getDb: () => {
    return db;
  },
};
