const Boom = require('boom')
const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute')

async function userInfo(req, res) {
  const user = await mongoClient.db.collection('users').findOne({ email: req.user.email });
  if (!user) {
    throw Boom.notFound('User does not exist');
  }
  const { salt, passwordHash, ...data } = user;
  res.json({
    data
  });
}

module.exports = asyncRoute(userInfo);