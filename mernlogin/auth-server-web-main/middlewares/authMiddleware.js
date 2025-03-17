const { findUser } = require('../services/authservices');
const { generateDecodedToken } = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');

exports.authenticatedRoutes = async (req, res, next) => {
  try {
    console.log(req.path, 'req.path', req.path.startsWith('/reset-password'));
    let secretKey;
    let token;
    if (req.path.startsWith('/reset-password')) {
      secretKey = process.env.RESET_SECRET;
      token = req.header('Authorization')?.replace('Bearer ', '');
    } else {
      secretKey = process.env.LOGIN_SECRET;
      token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');
    }
    // extracting token

    // if token is not there
    if (!token) {
      throw new ErrorHandler('Token Not Found', 401);
    }

    // Determine which API is being served

    // verify the incoming refresh token requred token and secret key
    const { err, decoded } = await generateDecodedToken(token, secretKey);
    if (err) {
      throw new ErrorHandler('Token Invalid or Expire', 401);
    }
    console.log(token, decoded, err, 'from middle');
    req.user = decoded.data;
    next();
  } catch (error) {
    next(error);
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Forbidden: You dont have access',
      });
    }
    next();
  };
};
