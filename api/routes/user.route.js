import { loginUser, logoutUser, registerUser, refreshAcessToken } from '../controllers/user.controller.js'
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


//path for the refesh token 
router.route("refesh_token").post(refreshAcessToken)

//path to change the password
router.route("/changeCurrentPassword").post(verifyJWT, changeCurrentPassword)


export default router

