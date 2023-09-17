const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    max: 20,
  },

  username: {
    type: String,
    require: true,
    unique: true,
    max: 20,
  },

  password: {
    type: String,
    require: true,
  },

  about: {
    type: String,
    min: 3,
    max: 100,
  },

  avatar: String,
});

userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
  next();
});

userSchema.method('getData', function () {
  return {
    id: this._id,
    name: this.name,
    username: this.username,
    password: this.password,
    about: this.about,
    avatar: this.avatar,
  };
});

userSchema.method('signJWT', function () {
  let data = this.getData();
  data.token = jwt.sign(data, process.env.JWT_SECRET);
  return data;
});

userSchema.method('checkPassword', function (password) {
  return bcrypt.compareSync(password, this.password);
});
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

const Model = mongoose.model('User', userSchema);

module.exports = Model;
