
const AuthController = require('./auth/auth.controller'); // Adjust the path if necessary

const Cms = require("./cms")

const  Front = require('./front')
module.exports = { AuthCtrl: AuthController, Cms , front};
