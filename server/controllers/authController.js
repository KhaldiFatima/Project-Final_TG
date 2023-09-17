const { isObjectIdOrHexString } = require('mongoose');
const User = require('../models/User');
const createError = require('http-errors');

const login = (req, res, next) => {
  let { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user || !user.checkPassword(password)) {
        throw createError(401, 'الرجاء التحقق من اسم المستخدم وكلمة المرور');
      }
      console.log('Logged in successfully !');
      res.json(user.signJWT());
    })
    .catch(next);
};

const register = (req, res, next) => {
  let { name, username, password } = req.body;
  let data = { name, username, password };
  User.findOne({ username })
    .then((user) => {
      if (user) {
        throw createError(401, 'اسم المستخدم موجود مسبقا ');
      }
      return User.create(data);
    })

    .then((user) => {
      res.json(user.signJWT());
      sendNewUser(user);
    })
    .catch(next);
};

const sendNewUser = (user) => {
  let { name, username, avatar } = user;
  let data = { name, username, avatar };
  io.emit('new_user', data);
};

module.exports = { register, login };
