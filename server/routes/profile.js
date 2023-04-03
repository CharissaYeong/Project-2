const express = require('express')
const router = express.Router()
const MongoUtil = require("../modules/MongoUtil");
const jwt = require('jsonwebtoken')

  router.get("/", async function(req,res){
    let db = await MongoUtil.connect()
    const user_list = await db.collection("users")
      .find({})
      .toArray();

      res.json(user_list);
})

module.exports = router