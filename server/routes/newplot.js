const express = require('express')
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");
const ObjectID = require('mongodb').ObjectId

router.post('/', async function (req, res) {
    const db = await MongoUtil.connect()
    const { type, story_id, content, userID } = req.body
    const objId = new ObjectID(userID);
    const entryID = new ObjectID();

    const newEntry = {
        "_id": entryID,
        "datetime": new Date(),
        "likes": 0,
        "story_id": story_id,
        "content": [content],
        "type": type,
    };

    try {
        await db.collection('users').updateOne(
            { _id: objId },
            {$push: { entries: { $each: [newEntry] }
                }
              }
        ) 
        res.status(201).send('Entry posted');
    } catch (err) {
        console.error(err);
        return res.status(409).send('Failed to create entry');
    } 
})

module.exports = router;

// const express = require('express')
// const router = express.Router();
// const MongoUtil = require("../modules/MongoUtil");
// const ObjectID = require('mongodb').ObjectId

// router.post('/', async function (req, res) {
//   const db = await MongoUtil.connect()
//   const { type, story_id, content, userID } = req.body
//   const objId = new ObjectID(userID)
//   const entryID = new ObjectID()

//   const newEntry = {
//     "_id": entryID,
//     "datetime": new Date(),
//     "likes": 0,
//     "story_id": story_id,
//     "content": [content],
//     "type": type,
//   }

//   try {
//     // Retrieve all entries from the database
//     const user = await db.collection('users').findOne({ _id: objId })
//     const allEntries = user.entries || []

//     // Append the new entry
//     allEntries.push(newEntry)

//     // Update the database with the updated list of entries
//     await db.collection('users').updateOne(
//       { _id: objId },
//       { $set: { entries: allEntries } }
//     )

//     res.status(201).send('Entry posted');
//   } catch (err) {
//     console.error(err);
//     return res.status(409).send('Failed to create entry');
//   } 
// })

// module.exports = router;
