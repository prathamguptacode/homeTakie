const mongose=require('mongoose')

const users=mongose.Schema({username: String, pass: String})

module.exports = mongose.model('users',users)