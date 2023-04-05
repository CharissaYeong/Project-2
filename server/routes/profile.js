const express = require('express')
const router = express.Router()
const MongoUtil = require("../modules/MongoUtil");
const ObjectId = require('mongodb').ObjectId

router.get("/users/:userID", async function (req, res) {
  let db = await MongoUtil.connect()
  const userID = req.params.userID

  try {
    const user = await db.collection("users")
      .find({ "_id": new ObjectId(userID) })
      .project({ '_id': 1, 'username': 1, 'email': 1 })
      .toArray();
      res.json(user);
  } catch (error) {
    res.status(401).send('Unauthorized access')
  }

})

module.exports = router