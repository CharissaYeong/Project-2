const express = require('express')
const router = express.Router()
const MongoUtil = require("../modules/MongoUtil");

router.get('/', async function (req, res) {
    let db = await MongoUtil.connect()
    try {
        const story = await db.collection('stories')
        .find({"active": "1"})
        .project({ 'active': 1, 'story_id': 1, 'prompt': 1, 'title': 1, 'plot': 1, '_id': 1})
        .toArray()
        res.json(story);
      } catch (error) {
        res.status(404).send('Story not found');
      }
})

module.exports = router
