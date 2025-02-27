// controllers/index.js

const AuthController = require('./auth/auth.controller'); // Adjust the path if necessary

const Cms = require("./cms")


module.exports = { AuthCtrl: AuthController, Cms };
