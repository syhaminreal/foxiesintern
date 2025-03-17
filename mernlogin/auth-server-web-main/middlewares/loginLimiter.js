const { rateLimit } = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: 'Too many login attemps. please try again later',
});

module.exports = loginLimiter;
