var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');

/* GET users listing. */
router.get('/:userId', isAuth, userController.getUser);

module.exports = router;
