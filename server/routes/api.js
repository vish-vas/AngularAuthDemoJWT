const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user') 
const mongoose = require('mongoose')
const db = "mongodb://username:password@ds1111111.mlab.com:37550/eventsdb"

mongoose.connect(db, err =>{
    if(err){
        console.error('Error: '+ err)
    } else {
        console.log('connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthorized reqest')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('unauthorized reqest')
    }
    let payload = jwt.verify(token, 'secretzzkeyyyy')
    if(!payload){
        return res.status(401).send('unauthorized reqest')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send("from api route")
})

router.post('/register', (req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        } else {
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, "secretzzkeyyyy")
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (error, user) =>{
        if(error){
            console.log(error)
        } else {
            if(!user){
                res.status(401).send('Invalid email')
            }
            else if(user.password !== userData.password) {
                res.status(401).send('Invalid password')
            } else {
                let payload = {subject: user._id}
                let token = jwt.sign(payload, "secretzzkeyyyy")
                res.status(200).send({token})
            }
        }
    })
})

router.get('/events', (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo1",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo2",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo3",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo4",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo5",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        }
    ]

    res.json(events)
})


router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo1",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo2",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo3",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo4",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo5",
            "description": "lorem ipsum",
            "date": "2018-04-23T18:25:43.511Z"
        }
    ]

    res.json(events)
})
module.exports = router