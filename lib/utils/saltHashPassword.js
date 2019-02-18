const crypto = require('crypto');

module.exports = function saltHashPassword(password, salt) {
  return sha512(password, salt || genRandomString(16));
}

function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length);
}

function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    passwordHash: value
  }
}