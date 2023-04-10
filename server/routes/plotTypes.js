// const express = require('express');
// const router = express.Router();
// const { ObjectId } = require('mongodb');
// const { getDb } = require('../database');

// router.get('/plot/:storyId', async (req, res) => {
//   try {
//     const db = getDb();
//     const storyId = req.params.storyId;
//     const story = await db.collection('stories').findOne({ _id: ObjectId(storyId) });
//     const openings = story.entries.filter(entry => entry.type === 'opening');
//     let selectedEntry;
//     if (openings.length > 0) {
//       const entriesWithLikes = openings.map(entry => ({ ...entry, likes: entry.likes.length }));
//       const maxLikes = Math.max(...entriesWithLikes.map(entry => entry.likes));
//       if (maxLikes > 0) {
//         selectedEntry = entriesWithLikes.find(entry => entry.likes === maxLikes);
//       } else {
//         selectedEntry = openings[Math.floor(Math.random() * openings.length)];
//       }
//       const selectedEntryContent = { _id: selectedEntry._id, content: selectedEntry.content };
//       const result = await db.collection('stories').updateOne(
//         { _id: ObjectId(storyId) },
//         { $set: { plot: [selectedEntryContent] } } // change $push to $set, and wrap selectedEntryContent in an array
//       );
//       res.send(result);
//     } else {
//       res.status(404).send('No openings found in the story');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal server error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectId;
const MongoUtil = require('../modules/MongoUtil'); 

const types = ['opening', 'conflict', 'climax', 'resolution', 'ending'];

router.get('/plot/:storyId/types', async (req, res) => {
  try {
    const db = await MongoUtil.connect();
    const storyId = req.params.storyId;
    const story = await db.collection('users')
      .find({"entries": {$elemMatch: {"story_id": new ObjectID(storyId)}}})
      .filter({"entries.type": "Opening"})
      .project({"entries._id": 1, "entries.content": 1, "_id": 0, "entries.type": 1})
      .toArray()
    res.send(story);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;