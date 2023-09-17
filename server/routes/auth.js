const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/', login);

router.post('/register', register);

// router.get('/register', function (req, res, next) {
//   res.send('respond with a register');
// });

module.exports = router;
