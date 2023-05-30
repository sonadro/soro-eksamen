// imports
const { Router } = require('express');
const mainController = require('../controllers/mainController');
const { loggedInCheck } = require('../middleware/auth');

const router = Router();

// middleware
router.use(loggedInCheck);

// routes
router.get('/', mainController.home_get);
router.get('/sign-in', mainController.signin_get);
router.get('/sign-up', mainController.signup_get);
router.get('/user', mainController.user_get);
router.get('/user/:username', mainController.user_get);

module.exports = router;