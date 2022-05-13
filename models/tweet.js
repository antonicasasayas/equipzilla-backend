const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TweetSchema = new Schema({
    text: {
        type: String,
        required: true
    },
   
    user: {
        type: String,
        required: true
    },
    
})

const Tweet = mongoose.model('Tweet', TweetSchema)

module.exports = Tweet