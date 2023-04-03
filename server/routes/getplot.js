const express = require('express')
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");
// const ObjectID = require('mongodb').ObjectId

router.get('/', async function (req, res) {
    // const { oid }
    // const objId = new ObjectID('642870aa2db4b4e6d6958750');
    let db = await MongoUtil.connect()
    try {
        const story = await db.collection('users')
        .find({})
        .project({ 'story_id': 1, 'entries': 1, '_id': 0})
        .filter({'entries.type': 'plot'})
        .toArray()
        res.send(story);
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
})

module.exports = router