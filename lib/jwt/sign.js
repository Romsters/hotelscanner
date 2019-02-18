const jwt = require('jsonwebtoken');

module.exports = function sign(payload) {
  return jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'RS256',
    audience: 'hotelscanner',
    issuer: 'hotelscanner',
    expiresIn: process.env.TOKEN_EXP || '30d'
  })
}