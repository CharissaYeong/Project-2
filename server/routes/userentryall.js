const express = require('express');
const router = express.Router();
const MongoUtil = require('../modules/MongoUtil');
const ObjectId = require('mongodb').ObjectId

router.get('/entries/:userID', async (req, res) => {
    const userID = req.params.userID
  try {
    const db = await MongoUtil.connect();
    const users = await db.collection('users')
    .find({ "_id": new ObjectId(userID) })
    .toArray();

    const allEntries = [];

    users.forEach((user) => {
      const userId = user._id.toString();
      const { username, entries } = user;

      if (entries?.length > 0) {
        entries.forEach((entry) => {
          allEntries.push({ ...entry, userId, username });
        });
      }
    });

    allEntries.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime);
    });

    res.json({ allEntries });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
