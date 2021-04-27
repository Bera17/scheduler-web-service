const morgan = require('morgan')


// Logger
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
morgan.token('currentUserEmail', (req) => {
  return req.currentUser && req.currentUser.email || "anonymous"
})
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :body (:currentUserEmail)')

// Attach current user
const attachCurrentuser = (req, res, next) => {
  const email = req.header("X-USER-EMAIL");
  if(email) req.currentUser = {email};
  next();
}

// Error handler
const errorHandler = (error, req, res, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}



exports.logger = logger
exports.attachCurrentuser = attachCurrentuser
exports.errorHandler = errorHandler