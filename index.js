'use strict'

// library function
import express from "express";
import mongoose from "mongoose";
import models from "./models/index.js";

const app = express()
const port = 3000
app.use(express.json())

const log = (msg) => console.log(msg);

const uri = 'mongodb+srv://trackit:waltongf4@cluster0.gbyyk.mongodb.net/trackit?retryWrites=true&w=majority'
const options = {}
const connectWithDB = () => {
    mongoose.connect(uri, options, (err, res) => {
        if(!err) console.log('Connected with DB')
        else console.log(err);
        
    })
}
connectWithDB()
app.get('/', (req, res) => {
    res.send('Hello Universe')
})

app.post('/', (req, res) => {
    const reqData = req.body
    const user = models.User({
        username: reqData.username,
        createdAt: Date.now()
    })
    user.save()
    .then(user => {
        res.status(201).send('User saved successfully.');
    })
    .catch(error => {
        res.status(500).send('Failed to save user');
    })
    
})

log(models)

app.listen(port, () => console.log(`listening to ${port}`))