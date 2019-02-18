module.exports = (err, req, res, next) => {
  const error = {
    code: 500,
    message: 'Internal server error'
  }
  if (err.isBoom) {
    if (err.output.payload.statusCode) {
      error.code = err.output.payload.statusCode;
    }
    if (err.message) {
      error.message = err.message;
    }
  }
  res.status(500).json({
    error
  })
}