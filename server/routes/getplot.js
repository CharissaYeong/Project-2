const express = require('express');
const router = express.Router();
const MongoUtil = require('../modules/MongoUtil');
const ObjectID = require('mongodb').ObjectId

router.get('/entries/:storyID', async (req, res) => {
  const storyID = req.params.storyID;
  try {
    const db = await MongoUtil.connect();
    const users = await db.collection('users')
    .find({})
    .toArray();

    const allEntries = [];

    users.forEach((user) => {
      const userId = user._id.toString();
      const { username, entries } = user;

      if (entries?.length > 0) {
        entries.forEach((entry) => {
          if (entry.story_id.toString() === storyID) {
            allEntries.push({ ...entry, userId, username });
          }
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