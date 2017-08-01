const mongoose = require("mongoose")

// use es6 promises
mongoose.Promise = global.Promise
// process.env.MONGODB_URI = "mongodb://admin:password@ds129053.mlab.com:29053/todo-api1121"
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/TodoApp")

module.exports = { mongoose }
