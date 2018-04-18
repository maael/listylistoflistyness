const mongoose = require('mongoose')

const trackedSchema = mongoose.Schema({
  type: String,
  details: Object,
  user: mongoose.Schema.Types.ObjectId
})

const Tracked = mongoose.model('Tracked', trackedSchema)

module.exports = Tracked
