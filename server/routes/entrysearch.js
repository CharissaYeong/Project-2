// const express = require('express');
// const router = express.Router();
// const MongoUtil = require('../modules/MongoUtil');

// router.get('/entries/content/:query', async (req, res) => {
//   const query = req.params.query;
//   try {
//     const db = await MongoUtil.connect();
//     const users = await db.collection('users')
//       .find({
//         "entries.content": {
//           $regex: new RegExp(query, 'i')
//         }
//       })
//       .toArray();

//     const allEntries = [];
//     let latestEntry = null;

//     users.forEach((user) => {
//       const userId = user._id.toString();
//       const { username, entries } = user;

//       if (entries?.length > 0) {
//         entries.forEach((entry) => {
//           allEntries.push({ ...entry, userId, username });

//           if (!latestEntry || entry.datetime > latestEntry.datetime) {
//             latestEntry = { ...entry, userId, username };
//           }
//         });
//       }
//     });

//     allEntries.sort((a, b) => {
//       return new Date(b.datetime) - new Date(a.datetime);
//     });

//     res.json({ allEntries, latestEntry });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const MongoUtil = require('../modules/MongoUtil');

router.get('/entries/content/:query', async (req, res) => {
  const query = req.params.query;
  try {
    const db = await MongoUtil.connect();
    const users = await db.collection('users')
      .find({
        // "entries.content": {
        //   $regex: new RegExp(query, 'i')
        // }
      })
      .toArray();

    const allEntries = [];

    users.forEach((user) => {
      const userId = user._id.toString();
      const { username, entries } = user;

      if (entries?.length > 0) {
        entries.forEach((entry) => {
          if (new RegExp(query, 'i').test(entry.content)) {
            allEntries.push({ ...entry, userId, username });
          }
        });
      }
    });

    allEntries.sort((a, b) => {
      return new Date(b.datetime) - new Date(a.datetime);
    });

    res.json({ allEntries });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
