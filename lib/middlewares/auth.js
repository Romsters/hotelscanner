var jwt = require('jsonwebtoken');
const asyncRoute = require('../utils/asyncRoute')

async function auth(req, res, next) {
  const authHeader = req.headers && req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    })
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_PUBLIC_KEY, {
      algorithms: ['RS256'],
      audience: 'hotelscanner',
      issuer: 'hotelscanner'
    })
    req.user = decoded
    next();
  } catch (err) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized'
      }
    })
  }
}

module.exports = asyncRoute(auth);