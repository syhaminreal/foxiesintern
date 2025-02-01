import { registerUser } from '../controllers/user.controller.js'

const router = require('express')

const  router  = Router()


router.route("/register").post(registerUser)

// router.route("/login").post(loginUser)

export default router

