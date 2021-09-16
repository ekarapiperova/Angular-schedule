const router = require('express').Router();
const users = require('./users');
const themes = require('./themes');
const test = require('./test');
const { authController } = require('../controllers');


router.use('/users', users);
router.use('/themes', themes);
router.use('/test', test);

module.exports = router;
