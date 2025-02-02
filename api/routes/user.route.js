import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js'
import {verifyJWT} from "../middlewares/auth.middleware.js"


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
router.route("/login").post(loginUser)

//securesroutes for logout
router.route("/logout").post(verifyJWT, logoutUser)




export default router

