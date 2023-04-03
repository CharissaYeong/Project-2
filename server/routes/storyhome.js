const express = require('express')
const router = express.Router()
const MongoUtil = require("../modules/MongoUtil");

router.get('/', async function (req, res) {
    let db = await MongoUtil.connect()
    try {
        const story = await db.collection('stories')
        .find({})
        .project({ 'story_id': 1, 'prompt': 1, 'title': 1, 'plot': 1, '_id': 0})
        .toArray()
        res.send(story);
      } catch (error) {
        res.status(500).send('Internal Server Error');
      }
})

module.exports = router
