const express = require('express');
const router = express.Router();
const MongoUtil = require("../modules/MongoUtil");

router.get('/', async function (req, res) {
    let db = await MongoUtil.connect();
    try {
        const entries = await db.collection('users')
            .find({})
            .project({ 'entries': 1, '_id': 1, 'username': 1 })
            .toArray();

        const latestEntry = entries.reduce((acc, curr) => {
            if (curr.entries && curr.entries.length > 0) {
                const entry = curr.entries[curr.entries.length - 1];
                if (!acc.datetime || entry.datetime > acc.datetime) {
                    return { ...entry, username: curr.username };
                }
            }
            return acc;
        }, {});

        res.json({ entries, latestEntry });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;