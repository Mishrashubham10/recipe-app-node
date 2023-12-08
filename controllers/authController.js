const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Creating Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: maxAge
  });
};

// handle errors
const handleError = (err) => {
  console.log(err.message, err.code);

  let errors = { email: '', password: '' };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'email is alredy in use';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    console.log(Object.values(err.errors));
  }

  return errors;
};

// @desc Signup user
// @route GET /api/auth
// @access PUBLIC
const getSignup = (req, res) => {
  res.render('singup');
};

// @desc Loin user
// @route GET /api/auth
// @access PUBLIC
const getLogin = (req, res) => {
  res.render('login');
};

// @desc Signup user
// @route POST /api/auth
// @access PUBLIC
const singupPost = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(409).json({ message: 'All fields required' });
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'Password must be 6 characters long' });
  }

  try {
    // User obj
    const userObj = {
      email,
      password
    };

    // Creating and Saving user into DB
    const user = await User.create(userObj);

    // Creating and Sending Cookie
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(201).json({ user: user._id });
  } catch (err) {
    handleError(err);
    res.status(400).json({ message: 'Invalid Credentials' });
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

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Incorrect credentials' });
    }

    // Comparing new user password to the real users password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Creating and sending token
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({});
  }
};

// @desc Logout user
// @route GET /api/auth
// @access PUBLIC
const logout = async (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
}

// Creating jwt token
const maxAge = 3 * 24 * 60 * 60;

module.exports = {
  getSignup,
  getLogin,
  singupPost,
  loginPost,
  logout
};