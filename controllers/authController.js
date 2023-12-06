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
const singupPost = (req, res) => {
  res.send('new singup');
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
