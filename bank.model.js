const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Bank = new Schema({
  name: {
        type: String
    },
    location: {
        type: String
    },
    time: {
        type: String
    }
    ,
    days: {
        type: String
    }
})

module.exports = mongoose.model('Bank', Bank)
