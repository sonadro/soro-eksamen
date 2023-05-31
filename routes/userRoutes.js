// imports
const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

// routes
router.post('/user-signup', userController.user_signup);
router.post('/user-signin', userController.user_signin);
router.get('/user-signout', userController.user_signout);
router.get('/users-get', userController.users_get);
router.post('/user-toggleadmin', userController.users_toggleadmin);

// export router
module.exports = router;