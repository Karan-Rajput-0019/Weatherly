const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/authcontroller');
const auth = require('../middleware/auth');

router.post('/signup', authcontroller.signup);
router.post('/login', authcontroller.login);
router.post('/logout', auth, authcontroller.logout);
router.get('/profile', auth, authcontroller.getProfile);
router.put('/profile', auth, authcontroller.updateProfile);

module.exports = router;
