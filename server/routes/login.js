const express = require('express')
const router = express.Router()
const MongoUtil = require("../modules/MongoUtil");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

require("dotenv").config();
// const mongoUri = process.env.;

// const generateAccessToken = (id, email) => {
//     return jwt.sign({
//         'user_id': id,
//         'email': email,
//     }, process.env.TOKEN_SECRET, {
//         expiresIn: "1h"
//     })
// }

router.post('/', async function(req,res){
    const db = await MongoUtil.connect()
    const { email, password }  = req.body;
    const user = await db.collection('users').findOne({ email })

    if (!user) {
        console.log('Account does not exsist');
        res.status(404).send('Account does not exsist');
    } else {
        const valid_password = await bcrypt.compare(password, user.password)
        if (!valid_password) {
            console.log('Email or password is incorrect');
            res.status(401).send('Email or password is incorrect');
        } else {
            const token = jwt.sign({id: user._id, email: user.email}, 
                process.env.TOKEN_SECRET, 
                // {expiresIn: "1h"}
                );
            res.status(202);
            res.send({token, userID: user._id, username: user.username})
        }
    }
    
    // let accessToken = generateAccessToken(user._id, user.email);
    // res.status(202);
    // res.send({ accessToken })
})


module.exports = router