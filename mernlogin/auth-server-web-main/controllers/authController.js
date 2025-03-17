const User = require('../models/userModel');
const {
  findUser,
  createUserOrUpdate,
  getAllUser,
} = require('../services/authservices');
const {
  sendVerificationMail,
  sendForgetPasswordLink,
} = require('../services/mailServices');
const { sendOTPVerification } = require('../services/smsServices');
const {
  generateTokens,
  generateDecodedToken,
} = require('../utils/authHandler');
const ErrorHandler = require('../utils/errorHandler');
const { comparePassword, hashPassword } = require('../utils/hashPassword');
const { isFieldErrorFree } = require('../utils/isFieldErrorFree');

// get all user
exports.getAllUser = async (req, res, next) => {
  // console.log(userId);
  try {
    const users = await getAllUser({});

    console.log(users, 'from the user');

    res.status(200).json({
      message: 'User fetched success',
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserByIdController = async (req, res, next) => {
  // extracting the id
  const userId = req.user.id;
  // console.log(userId);
  try {
    const user = await findUser({ id: userId }, [
      '-password',
      '-refreshToken',
      '-otp',
      '-__v',
    ]);

    // if user is not exist
    if (!user) {
      throw new ErrorHandler('User with id not found!');
    }
    res.status(200).json({
      message: 'User fetched success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.registerController = async (req, res, next) => {
  // data sanitization aginst site script XSS and validate
  await isFieldErrorFree(req, res);
  const { username, password, email, role, phone } = req.body;
  try {
    // Service Function to find data from email or username
    const userExist = await findUser({ email, username });
    if (userExist) {
      throw new ErrorHandler('User With Email or Username already exist', 400);
    }
    // hash password
    const hashedPassword = await hashPassword(password);

    // Store User
    const savedData = await createUserOrUpdate({
      username,
      password: hashedPassword,
      email,
      role: role,
      phone,
    });

    // sending Mail
    const verificationOTP = await sendVerificationMail(savedData);

    // Updating Otp in the existing user
    const updatedData = await createUserOrUpdate(
      {
        otp: verificationOTP,
      },
      savedData
    );

    res.status(201).json({
      error: false,
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    // Service Function to find data from email or username
    const user = await findUser({ email, username });
    if (!user) {
      throw new ErrorHandler('Username or Email not exist', 401);
    }
    // hash password
    const correctPassword = await comparePassword(password, user.password);
    if (!correctPassword) {
      throw new ErrorHandler('Password doesnot match', 401);
    }

    const { token, refreshToken } = await generateTokens(user, 'LOGIN_SECRET');

    // Updating Refresh Token in the existing user model
    const updatedData = await createUserOrUpdate(
      {
        refreshToken: refreshToken,
      },
      user
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: false,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.status(201).json({
      error: false,
      data: updatedData,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshTokenController = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  // if no refresh token
  if (!refreshToken) {
    throw new ErrorHandler('Refresh Teken not found', 401);
  }

  try {
    // verify the incoming refresh token requred token and secret key
    const { err, decoded } = await generateDecodedToken(refreshToken, 'secret');

    if (Boolean(err)) {
      throw new ErrorHandler('Invalid Token', 401);
    }

    // find the user associated with refresh token
    const user = await User.findById(decoded?.data?.id);

    // if user isnt found, deny access
    if (!user) {
      throw new ErrorHandler('User not found', 404);
    }

    // if the stored refresh token doesnt match the incomning
    // deny access
    if (user?.refreshToken !== refreshToken) {
      throw new ErrorHandler('Refresh Token is not valid', 401);
    }

    const { token: accessToken } = await generateTokens(user);

    // set options
    let cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    // clear existing cookie
    res.clearCookie('accessToken', cookieOptions);

    // set the new tokens in cookies
    res
      .status(200)
      .cookie('accessToken', accessToken, cookieOptions)
      .json({ accessToken, message: 'Acees Token Generated' });

    console.log(err, decoded);
  } catch (error) {
    next(error);
  }
};

exports.verifyMailController = async (req, res, next) => {
  // await isFieldErrorFree(req, res);
  const { otp, userId } = req.body;
  try {
    const user = await findUser({ id: userId });
    // if user is not exist
    console.log(user, 'from user');
    if (!user) {
      throw new ErrorHandler('User with this id not found!');
    }
    if (user.otp !== otp) {
      throw new ErrorHandler('OTP doesnot match');
    }
    // updating the email verified
    let response = await createUserOrUpdate({ email_verified: true }, user);
    res.status(200).json({ response, message: 'Acees Token Generated' });
  } catch (error) {
    next(error);
  }
};
exports.forgetPasswordController = async (req, res, next) => {
  // receive email
  const { email } = req.body;
  try {
    // Service Function to find data from email or username
    const user = await findUser({ email });
    if (!user) {
      throw new ErrorHandler('Username or Email not exist', 401);
    }

    // sending Mail
    const token = await sendForgetPasswordLink(user);

    res.status(201).json({
      error: false,
      message: 'Link has been sent!',
      token,
    });
  } catch (error) {
    next(error);
  }
};
exports.resetPasswordController = async (req, res, next) => {
  // extracting the id
  const userId = req.user?.id;
  const { password } = req.body;
  // console.log(userId);
  try {
    const user = await findUser({ id: userId }, [
      '-password',
      '-refreshToken',
      '-otp',
      '-__v',
    ]);

    // if user is not exist
    if (!user) {
      throw new ErrorHandler('User with id not found!');
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // Updating Refresh Token in the existing user model
    const updatedData = await createUserOrUpdate(
      {
        password: hashedPassword,
      },
      user
    );

    res.status(200).json({
      message: 'Password update success',
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.logoutController = async (req, res, next) => {
  const { userId } = req.user?.id;
  try {
    const user = await findUser({ id: userId });

    // if user is not exist
    if (!user) {
      throw new ErrorHandler('User with id not found!');
    }
    // clearing the cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
    // clearing the cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });
    res.status(200).json({
      error: false,
      message: 'Logout Success',
    });
  } catch (error) {
    next(error);
  }
};

exports.sendOtpController = async (req, res, next) => {
  const { phone } = req.body;
  try {
    const user = await findUser({ phone });
    // if user is not exist
    if (!user) {
      throw new ErrorHandler('User with id not found!');
    }
    const verificationOTP = await sendOTPVerification(phone);

    console.log(verificationOTP, 'From 318');
    // Updating Refresh Token in the existing user model
    const updatedData = await createUserOrUpdate(
      {
        phoneOtp: verificationOTP,
      },
      user
    );
    res.status(201).json({
      message: 'Message Sent Success',
      otp: verificationOTP,
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyOtpController = async (req, res, next) => {
  const { phone, otp } = req.body;

  try {
    const user = await findUser({ phone });
    console.log(user, 'From user line 344', user.phoneOtp, otp);
    // if user is not exist
    if (!user || user.phoneOtp !== otp) {
      throw new ErrorHandler('Invalid Otp');
    }
    const updatedData = await createUserOrUpdate(
      {
        phone_verified: true,
      },
      user
    );
    res.status(201).json({
      message: 'Phone Number verified Sucess',
      data: updatedData,
    });
  } catch (error) {
    next(error);
  }
};
