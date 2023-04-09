const express = require('express');
const router = express.Router();
const MongoUtil = require('../modules/MongoUtil');
const ObjectID = require('mongodb').ObjectId;

router.get('/:storyID/entries', async (req, res) => {
  const { storyID } = req.params;
  const db = await MongoUtil.connect();

  try {
    // Ensure that storyID is a valid ObjectId
    if (!new ObjectID(storyID)) {
      return res.status(404).send({ error: `Story with ID ${storyID} not found` });
    }

    // Find the story with the given ID
    const story = await db.collection('stories').findOne({ _id: new ObjectID(storyID) });

    if (!story) {
      return res.status(404).send({ error: `Story with ID ${storyID} not found` });
    }

    // Find all entries in the users collection that match the given story ID,
    // and sort them by datetime in descending order
    const entries = await db.collection('users').aggregate([
      { $match: { "entries.story_id": new ObjectID(storyID) } },
      { $unwind: "$entries" },
      { $match: { "entries.story_id": new ObjectID(storyID) } },
      { $sort: { "entries.datetime": -1 } },
      {
        $group: {
          _id: null,
          plot: { $push: { _id: "$entries._id", content: "$entries.content" } }
        }
      },
      { $project: { _id: 0, plot: 1 } }
    ]).toArray();

    // Create a new story object with the sorted entries in the plot field
    const sortedStory = { ...story, plot: entries[0]?.plot?.reverse() ?? [] };

    // Update the story with the sorted entries in the plot field
    const result = await db.collection('stories').findOneAndUpdate(
      { _id: new ObjectID(storyID) },
      { $set: { plot: sortedStory.plot } },
      { $project: {_id: 1, plot: 1}},
      { returnOriginal: false }
    );

    res.send(result.value.plot);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Something went wrong' });
  }
});

module.exports = router;