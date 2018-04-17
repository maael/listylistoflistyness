const { MONGODB } = require('dotenv-extended').load()
const mongoose = require('mongoose')
mongoose.connect(MONGODB)
module.exports = mongoose
