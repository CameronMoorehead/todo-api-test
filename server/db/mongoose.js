const mongoose = require("mongoose")

// use es6 promises
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)

module.exports = { mongoose }
