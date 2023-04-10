const express = require('express');
const router = express.Router();
const MongoUtil = require('../modules/MongoUtil');
const ObjectID = require('mongodb').ObjectId

router.post('/:entryId/like', async (req, res) => {
  const entryId = req.params.entryId;
  const userId = req.body.userId;
  try {
    const db = await MongoUtil.connect()
    // Check if user is trying to like their own entry
    const user = await db.collection('users').findOne({ 'entries._id': new ObjectID(entryId), '_id': new ObjectID(userId) });
    if (user) {
      return res.status(400).send('You cannot like your own entry');
    }

    // Check if the user has already liked the entry
    const entry = await db.collection('users').findOne({
      'entries._id': new ObjectID(entryId),
      'entries.liked': new ObjectID(userId)
    });

    if (entry) {
      // return res.status(400).send('You have already liked this entry');
      return res.status(400).send('You have already liked this entry' );
    }

    const result = await db.collection('users').updateOne(
      { 'entries._id': new ObjectID(entryId) },
      { $addToSet: { 'entries.$.liked': new ObjectID(userId) } }
    );
    res.json({ message: 'Entry liked successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Failed to like entry');
  }
});

module.exports = router;

