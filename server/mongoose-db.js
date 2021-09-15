require('./connect')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
/* 自定义Schema */

const User_Schema = new Schema({
    id: Number,
    username:String,
    password:String,
    sex: String,
    role:String,
    registerDate:Date
})

const User = mongoose.model("User", User_Schema)
exports.User = User

