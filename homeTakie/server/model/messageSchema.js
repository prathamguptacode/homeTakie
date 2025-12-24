const mongose=require('mongoose')

const messages=mongose.Schema({message: String})

module.exports = mongose.model('messages',messages)