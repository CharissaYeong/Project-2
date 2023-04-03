const express = require('express')
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");
const ObjectID = require('mongodb').ObjectId

router.post('/', async function (req, res) {
    const db = await MongoUtil.connect()
    const { datetime, likes, type, story_id, content, oid } = req.body
    const objId = new ObjectID(oid);

    const newEntry = {
        "datetime": datetime,
        "likes": likes,
        "story_id": story_id,
        "content": [content],
        "type": type,
    };


    try {
        db.collection('users').updateOne(
            { _id: objId },
            { $push: { entries: newEntry}}
        ) 
        res.status(201).send('Entry posted');
    } catch (err) {
                res.status(409).send('Failed to create entry');
    } 

})

module.exports = router