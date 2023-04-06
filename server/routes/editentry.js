// const express = require('express');
// const router = express.Router();
// const MongoUtil = require("../modules/MongoUtil");
// const ObjectID = require('mongodb').ObjectId;

// router.put('/entries/edit/:userID/:entryID', async (req, res) => {
//     const db = await MongoUtil.connect()
//     const User = db.collection('users')
//     try {
//       const userID = req.params.userID;
//       const entryID = req.params.entryID;
//       const newContent = req.body.content;
  
//       const user = await User.findOneAndUpdate(
//         { _id: new ObjectID(userID), "entries._id": entryID },
//         { $set: { "entries.$.content": newContent } },
//         { new: true }
//       );

//       if (!user) {
//         return res.status(404).send("User or entry not found" );
//       }
  
//       res.status(202).send("Entry updated successfully");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Server error");
//     }
//   });
// module.exports = router;

const express = require('express');
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");
const ObjectID = require('mongodb').ObjectId;

router.put('/entries/edit/:userID/:entryID', async (req, res) => {
  const db = await MongoUtil.connect();
  const User = db.collection('users');
  const userID = req.params.userID;
  const entryID = req.params.entryID;
  const newContent = req.body;

  if (!userID || !entryID || !newContent) {
    return res.status(400).send("Invalid input");
  }

  try {
    const result = await User.updateOne(
      { _id: new ObjectID(userID), "entries._id": new ObjectID(entryID) },
      { $set: { "entries.$.content": newContent.content } },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send("User or entry not found");
    }

    res.status(202).send("Entry updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;