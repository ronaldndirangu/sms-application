const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY, 
                          { expiresIn: 60*60*24*60});
    return token;
  }
}