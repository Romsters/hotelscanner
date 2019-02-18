const Boom = require('boom')
const sign = require('@hotelscanner/lib/jwt/sign');
const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute')
const emailValidator = require('@hotelscanner/lib/utils/emailValidator')
const saltHashPassword = require('@hotelscanner/lib/utils/saltHashPassword')

async function register(req, res) {
  const email = req.body.email;
  if (!emailValidator.isEmailValid(email)) {
    throw Boom.badRequest('Email should be in valid format');
  }
  const password = req.body.password;
  if (!password || password.length < 8) {
    throw Boom.badRequest('Password should be at least 8 characters');
  }
  const name = req.body.name;
  if (!name) {
    throw Boom.badRequest('Name is required');
  }
  const exists = await mongoClient.db.collection('users').findOne({ email });
  if (exists) {
    throw Boom.conflict(`User with email '${email}' already exists`);
  }
  const { passwordHash, salt } = saltHashPassword(password);
  const user = {
    email,
    name,
    passwordHash,
    salt
  };
  const { insertedId } = await mongoClient.db.collection('users').insertOne(user);
  const token = sign({
    sub: insertedId.toString(),
    email: user.email
  });
  res.json({
    data: {
      token
    }
  });
}

module.exports = asyncRoute(register);