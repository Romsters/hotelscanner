const Boom = require('boom')
const sign = require('@hotelscanner/lib/jwt/sign');
const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute')
const emailValidator = require('@hotelscanner/lib/utils/emailValidator')
const saltHashPassword = require('@hotelscanner/lib/utils/saltHashPassword')

async function login(req, res) {
  const email = req.body.email;
  if (!emailValidator.isEmailValid(email)) {
    throw Boom.badRequest('Email should be in valid format');
  }
  const password = req.body.password;
  if (!password || password.length < 8) {
    throw Boom.badRequest('Password should be at least 8 characters');
  }
  const user = await mongoClient.db.collection('users').findOne({ email });
  if (!user) {
    throw Boom.unauthorized('Email - password combination does not exist');
  }
  const { passwordHash } = saltHashPassword(password, user.salt);
  if (user.passwordHash !== passwordHash) {
    throw Boom.unauthorized('Email - password combination does not exist');
  }
  const token = sign({
    sub: user._id.toString(),
    email: user.email
  });
  res.json({
    data: {
      token
    }
  });
}

module.exports = asyncRoute(login);