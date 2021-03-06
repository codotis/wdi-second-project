const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  password: { type: String, required: true },
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true}],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true}]
});

userSchema.virtual('tracks', {
  ref: 'Track',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password ) {
    this.invalidate('passwordConfirmation', 'Passwords do not match, please try again');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
