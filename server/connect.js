const mongoose = require('mongoose')

mongoose.set('debug', true)

mongoose.connect('mongodb://localhost:27017/test1')

exports.mongoose = mongoose