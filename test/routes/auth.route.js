import express from "express"
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkauth} from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"


const router = express.Router()

router.get("/check-auth", verifyToken, checkauth)

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)


router.post("/verify-email",verifyEmail)

router.post("/forgot-password",forgotPassword)

router.post("/reset-password/:token",resetPassword)

export default router