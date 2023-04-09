const express = require('express');
const router = express.Router();
const MongoUtil = require('../modules/MongoUtil');

router.get('/content/:storyID/:query', async (req, res) => {
  const query = req.params.query;
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
          if (new RegExp(query, 'i').test(entry.content) ||
          new RegExp(query, 'i').test(entry.type) ||
          new RegExp(query, 'i').test(entry._id) ||
          new RegExp(query, 'i').test(username)
          && entry.story_id.toString() === storyID) {
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
