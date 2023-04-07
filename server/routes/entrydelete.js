const express = require('express')
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");
const ObjectID = require('mongodb').ObjectId

router.delete('/delete/:userID/:entryID', async function (req, res) {
    const userID = req.params.userID;
    const entryID = req.params.entryID;
    
    try {
      const db = await MongoUtil.connect();
      const result = await db.collection('users').updateOne(
        { _id: new ObjectID(userID) },
        { $pull: { entries: { _id: new ObjectID(entryID) } } }
      );
      
      if (result.modifiedCount === 0) {
        return res.status(404).send('Entry not found');
      }
      
      return res.status(200).send('Entry deleted');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Failed to delete entry');
    }
  });
  
  module.exports = router;