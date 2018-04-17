const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  battlenet: Array
})

userSchema.plugin(passportLocalMongoose)

userSchema.statics.associateBattleNet = function (user, profile, cb) {
  this.findByIdAndUpdate(user._id, { $push: { battlenet: profile } }, { lean: true, new: true }, cb)
}

userSchema.statics.revokeBattlenet = function (userId, battlenetId, cb) {
  console.log('removing', userId, battlenetId)
  this.findByIdAndUpdate(userId, { $pull: { battlenet: { id: Number(battlenetId) } } }, { lean: true, new: true }, cb)
}

const User = mongoose.model('User', userSchema)

module.exports = User
