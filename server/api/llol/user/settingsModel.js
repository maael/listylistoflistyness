const mongoose = require('mongoose')

const settingsSchema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  settings: Object
})

const Settings = mongoose.model('Settings', settingsSchema)

module.exports = Settings
