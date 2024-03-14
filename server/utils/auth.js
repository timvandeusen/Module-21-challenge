const jwt = require('jsonwebtoken');

const signToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { signToken, authMiddleware };