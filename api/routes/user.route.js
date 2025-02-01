import { registerUser } from '../controllers/user.controller.js'

const router = require('express')

const  router  = Router()


router.route("/register").post(
    uploads.fileds([
        {
            name: "avtar",
            maxCount:1
        },
        {
            name: "coverImage",
            maxCount: 1
        }

    ]),
    registerUser
)

// router.route("/login").post(loginUser)

export default router

