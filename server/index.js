// SETUP BEGINS
const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const MongoClient = require("mongodb").MongoClient;
const MongoUtil = require("./modules/MongoUtil");
const jwt = require('jsonwebtoken')

// const mongoUri = process.env.MONGO_URI;

let app = express();

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
// app.use(cors());

// Routes
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const profileRoute = require('./routes/profile')
const storyhomeRoute = require('./routes/storyhome')
const getplotRoute = require('./routes/getplot')
const newplotRoute = require('./routes/newplot')

const checkIfAuthenticatedJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }

          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

app.use("/register", registerRoute)
app.use("/login", loginRoute)
app.use("/profile", checkIfAuthenticatedJWT, profileRoute)
app.use("/storyhome", storyhomeRoute)
app.use("/getplot", getplotRoute)
app.use("/newplot", newplotRoute)

// START SERVER
app.listen(3001, () => {
  console.log("Server has started");
});