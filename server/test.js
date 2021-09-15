const mongodb = require('./connect')
const Schema = mongodb.mongoose.Schema
const UserSchema = new Schema({
    username:String,
    password:String,
    salt:String,
    role:String,
})
const User = mongodb.mongoose.model('User', UserSchema)

// find
console.log("查")
const arr = User.find({username:"amy"}, function(err,docs){console.log(err)})

console.log(arr)

// update
console.log("改")
User.updateOne({username:"amy"},{salt:"112"},function (error) {
})

// delete


// const amy = new User({
//     username:"amy",
//     password:"123455",
//     salt:"1122",
//     role:"admin"
// })
// amy.save()
// const UserDAO = function(){}

// UserDAO.prototype.save = (obj, callback) => {
//     const instance = new User(obj)
//     instance.save(err=>{
//         callback(err)
//     })
// }

// UserDAO.prototype.findByName = (name,callback) => {
//     User.findOne( {username:name}, (err,obj) => {
//         callback(err, obj)
//     } )
// }

// module.exports = new UserDAO