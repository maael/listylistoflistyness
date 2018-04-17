const mongoose = require('mongoose')

const trackedSchema = mongoose.Schema({
  type: String,
  details: Object
})

const Tracked = mongoose.model('Tracked', trackedSchema)

module.exports = Tracked
