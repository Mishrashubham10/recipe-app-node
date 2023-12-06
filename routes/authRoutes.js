const express = require('express');
const router = express.Router();
const {
  getSignup,
  getLogin,
  singupPost,
  loginPost,
} = require('../controllers/authController');

router.get('/signup', getSignup);
router.post('/signup', singupPost);
router.get('/login', getLogin);
router.post('/login', loginPost);

module.exports = router;