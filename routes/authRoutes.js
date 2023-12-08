const express = require('express');
const router = express.Router();
const {
  getSignup,
  getLogin,
  singupPost,
  loginPost,
  logout
} = require('../controllers/authController');

router.get('/signup', getSignup);
router.post('/signup', singupPost);
router.get('/login', getLogin);
router.post('/login', loginPost);
router.get('/logout', logout);

module.exports = router;