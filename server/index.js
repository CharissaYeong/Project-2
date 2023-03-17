// SETUP BEGINS
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const mongoUri = process.env.MONGO_URI;

const COLLECTION = "users";
const DB = "Project_2";

let app = express();

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
app.use(cors());

// SETUP END
async function main() {

    const client = await MongoClient.connect(process.env.MONGO_URI, {
        "useUnifiedTopology": true
    });
     const db = client.db(DB);

    app.get("/get_users", async function(req,res){
        const user_list = await db.collection("users")
          .find({})
          .toArray();

          res.json(user_list);
    })
}


main();

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});