const router = require('express').Router();
const { AuthenticationController } = require('../controllers');

router.post('/login', AuthenticationController.login);
router.post('/register', AuthenticationController.register);
router.post('/forgot-password', AuthenticationController.forgotPassword);
router.post('/reset-password', AuthenticationController.resetPassword);

module.exports = router;
