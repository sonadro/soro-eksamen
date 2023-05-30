// imports
const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

// routes
router.post('/user-signup', userController.user_signup);

// export router
module.exports = router;