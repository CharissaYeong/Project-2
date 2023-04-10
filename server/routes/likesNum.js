const express = require('express');
const router = express.Router();
const MongoUtil = require('../modules/MongoUtil');
const ObjectID = require('mongodb').ObjectId;

router.get('/:entryId/likes/number/count', async (req, res) => {
  const entryId = req.params.entryId;
  const db = await MongoUtil.connect();
  try {
    // Retrieve the entry with the given ID
    const entry = await db.collection('users').findOne({ 'entries._id': new ObjectID(entryId) });
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Retrieve the number of users that have liked the entry
    const likes = entry.entries.reduce((total, current) => {
      if (current._id.toString() === entryId) {
        return current.liked.length;
      }
      return total;
    }, 0);

    // Update the entry with the number of likes
    const result = await db.collection('users').updateOne({ 'entries._id': new ObjectID(entryId) }, { $set: { 'entries.$.likes': likes } });
    if (result.modifiedCount !== 1) {
      throw new Error('Failed to update entry with likes');
    }

    res.json({ likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;