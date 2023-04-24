// const MongoClient = require("mongodb").MongoClient

// async function connect(uri, dbname) {
//     let client = await MongoClient.connect(uri,{
//         useUnifiedTopology: true 
//     })
//     const db = client.db(dbname);
//     return db;
// }

// module.exports = { connect };

const MongoClient = require("mongodb").MongoClient
require("dotenv").config();
// const mongoUri = process.env.MONGO_URI;
const express = require("express");
const cors = require("cors");

// const mongoUri = process.env.MONGO_URI;

let app = express();

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
app.use(cors());


async function connect() {
    let client = await MongoClient.connect(process.env.MONGO_URI,{
        useUnifiedTopology: true,
    })
    const db = client.db("Project_2");
    return db;
}

module.exports = { connect };