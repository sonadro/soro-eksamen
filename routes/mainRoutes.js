// imports
const { Router } = require('express');
const mainController = require('../controllers/mainController');
const { loggedInCheck, requireAdmin, requireOwner } = require('../middleware/auth');

const router = Router();

// middleware
router.use(loggedInCheck);

// routes
router.get('/', mainController.home_get);
router.get('/sign-in', mainController.signin_get);
router.get('/sign-up', mainController.signup_get);
router.get('/user', mainController.user_get);
router.get('/user/:username', mainController.user_get);

// adminsider
router.get('/admin', requireAdmin, mainController.admin_get);
router.get('/admin/prosjektplan', requireAdmin, mainController.admin_prosjektplan_get);
router.get('/admin/ip-plan', requireAdmin, mainController.admin_ipplan_get);
router.get('/admin/veiledning', requireAdmin, mainController.admin_veiledning_get);
router.get('/admin/veiledning/trusler', requireAdmin, mainController.admin_veiledning_trusler_get);
router.get('/admin/veiledning/autentisering', requireAdmin, mainController.admin_veiledning_autentisering_get);

// eierside
router.get('/eier', requireOwner, mainController.owner_get);

module.exports = router;