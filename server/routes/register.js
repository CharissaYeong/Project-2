const express = require('express')
const router = express.Router()
const MongoUtil = require("../modules/MongoUtil");
const bcrypt = require('bcrypt')

router.post('/', async function (req, res) {
    const db = await MongoUtil.connect()
    const { username, email, password }  = req.body;
    const hashed_password = await bcrypt.hash(password, 10)
    const user_email = await db.collection('users').findOne({ email })
    const user_name = await db.collection('users').findOne({ username })

    if (user_email) {
        console.log('Account already exsists');
        res.status(409).send('Account already exsists');
    } else if (user_name) {
        console.log('Username has been taken');
        res.status(409).send('Username has been taken');
    } else {
        const new_user = await db.collection('users').insertOne({
            'email': email,
            'username': username,
            'password': hashed_password
        })
        console.log('Account registered successfully');
        res.status(201).send('Account registered successfully');
    }
})

module.exports = router