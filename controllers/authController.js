const User = require('../models/User')
const bcrypt = require('bcrypt')

// @desc Signup user
// @route GET /api/auth
// @access Private
const getSignup = (req, res) => {
  res.render('singup');
};

// @desc Loin user
// @route GET /api/auth
// @access Private
const getLogin = (req, res) => {
  res.render('login');
};

// @desc Signup user
// @route POST /api/auth
// @access Private
const singupPost = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(409).json({ message: 'All fields required' });
  }

  try {
    // Hashing Password
    const hashedPwd = await bcrypt.hash(password, 10)

    // User obj
    const userObj = {
      email,
      password: hashedPwd
    }

    // Creating and Saving user into DB
    const user = await User.create(userObj)

    res.status(201).json(user)
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error, user not created' })
  }
};

// @desc Login user
// @route POST /api/auth
// @access Private
const loginPost = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(409).json({ message: 'All fields required' });
  }

  console.log(`Your email is ${email} and Your Password ${password}`);
};

module.exports = {
  getSignup,
  getLogin,
  singupPost,
  loginPost,
};