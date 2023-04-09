const express = require('express');
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");
const ObjectID = require('mongodb').ObjectId;

router.get('/original/getcontent/:userID/:entryID', async (req, res) => {
  const db = await MongoUtil.connect();
  const User = db.collection('users');
  const userID = req.params.userID;
  const entryID = req.params.entryID;

  if (!userID || !entryID) {
    return res.status(400).send("Invalid input");
  } else {
    try {
      const original = await User
      .find({ _id: new ObjectID(userID), "entries._id": new ObjectID(entryID) })
      .project({ "entries.$": 1, _id: 0})
      .toArray();
      res.json({ original })
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
});

module.exports = router;