const express = require('express');
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");
const { ObjectId } = require('mongodb');

router.patch('/users/:userID/entries/:entryID/likes', async (req, res) => {
  const userID = req.params.userID;
  const entryID = req.params.entryID;

  let db = await MongoUtil.connect()
  const User = db.collection("users")

  try {
    const user = await User.findOne({ _id: new ObjectId(userID) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const entry = user.entries.find(entry => entry._id.toString() === entryID);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    // Check if user has already liked the entry
    const userLikedEntry = entry.likes.find((likedEntry) => likedEntry.toString() === userID);
    if (userLikedEntry) {
      return res.status(400).json({ message: 'Entry already liked by user' });
    }

    entry.likes.push(new ObjectId(userID));

    await User.updateOne({ _id: new ObjectId(userID) }, { $set: { entries: user.entries } });

    res.status(200).json({ message: 'Entry likes updated', entry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;