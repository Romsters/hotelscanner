const constants = require('../constants')

module.exports = {
  isEmailValid(email) {
    if (typeof email !== 'string') {
      return false
    }
    return constants.emailRegexp.test(email)
  }
}
