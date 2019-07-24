const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.body.token || req.headers.authorization
  if (!token) return res.status(401).json({
    message: "Token not found!"
  })

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(401).json('Invalid token provided!')
    req.user = {};
    req.user.id = user.id;
    req.user.email = user.email;
    next();
  })
}

module.exports = authenticate;