const express = require('express');
const router = express.Router();
const controller = require('../controllers/accountController');
const auth = require('../middlewares/auth');

router.post('/password', auth.authenticated, controller.password);

module.exports = router;
