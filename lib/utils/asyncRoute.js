module.exports = handler => (req, res, next = console.error) => {
  return Promise.resolve(handler(req, res, next)).catch(next)
}