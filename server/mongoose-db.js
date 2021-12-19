require('./connect')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
/* 自定义Schema */

/**
 * 用户信息表
 */
const User_Schema = new Schema({
    id: Number,
    username:String,
    password:String,
    sex: String,
    role:String,
    registerDate:Date
})
/**
 * 聊天关系表
 */
const Link_Schema = new Schema({
    linkid: Number,
    fromUser: String,
    toUser: String,
    createTime: Date
})

/**
 * 聊天列表
 */
const ChatList_Schema = new Schema({
    listid: Number,
    linkid: Number,
    fromUser: String,
    toUser: String,
    fromWindow: Boolean,
    toWindow: Boolean,
    unread: Number,
    status: Boolean
})

/**
 * 聊天内容表
 */

const Message_Schema = new Schema({
    id: Number,
    roomId: Number,
    username: String,
    content: String,
    date: String
})

const User = mongoose.model("User", User_Schema)
const Link = mongoose.model("Link", Link_Schema)
const ChatList = mongoose.model("ChatList", ChatList_Schema)
const Message = mongoose.model('Message', Message_Schema)

exports.User = User
exports.Link = Link
exports.ChatList = ChatList
exports.Message = Message