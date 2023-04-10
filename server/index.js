// SETUP BEGINS
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require('jsonwebtoken')

let app = express();

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
// const whitelist = ["http://localhost:3000", "https://64330c82dc4a9a6129100353--dulcet-figolla-934b3d.netlify.app"]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }

// app.use(cors(corsOptions))
app.use(cors());

const checkIfAuthenticatedJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)

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



// Routes
const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const profileRoute = require('./routes/profile')
const storyhomeRoute = require('./routes/storyhome')
const getplotRoute = require('./routes/getplot')
const newplotRoute = require('./routes/newplot')
const entrysearchRoute = require('./routes/entrysearch')
const userentryRoute = require('./routes/userentry')
const userentryallRoute = require('./routes/userentryall')
const entrydelete = require('./routes/entrydelete')
const editentry = require('./routes/editentry')
const getentry = require('./routes/getentry')
const storyplotRoute = require('./routes/storyplot')
const likeRoute = require('./routes/like')
const likesNumRoute = require('./routes/likesNum')
const plotRoute = require('./routes/plotTypes')

app.use("/register", registerRoute)
app.use("/login", loginRoute)
app.use("/", profileRoute)
app.use("/stories", storyhomeRoute)
app.use("/entries", getplotRoute)
app.use("/newplot", newplotRoute)
app.use("/entries", entrysearchRoute)
app.use("/entries", userentryallRoute)
app.use("/entries", userentryRoute)
app.use("/entries", entrydelete)
app.use("/entries", editentry)
app.use("/entries", getentry)
app.use("/stories", storyplotRoute)
app.use("/entries/", likeRoute)
app.use("/entries/", likesNumRoute)
app.use("/stories", plotRoute)

// checkIfAuthenticatedJWT

// START SERVER
// app.listen(3001, () => {
//   console.log("Server has started");
// });
app.listen(process.env.PORT || 3001, function(){
  console.log("Server has started")
})