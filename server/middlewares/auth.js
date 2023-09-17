const User = require('../models/User');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

exports.socket = (socket, next) => {
  if (!socket.handshake.query || !socket.handshake.query.token) {
    return next(createError(401, 'auth_error'));
  }
  jwt.verify(
    socket.handshake.query.token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) return next(createError(401, 'auth_error'));
      User.findById(decoded.id)
        .then((user) => {
          // console.log('hello from User.findBuId');
          if (!user) return next(createError(401, 'auth_error'));
          socket.user = user;
          // console.log(socket.user);
          next();
        })
        //  .catch((err) => {
        // console.log(err);
        //       next();
        .catch(next);
    }
  );
};
