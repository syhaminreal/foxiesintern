import express from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer"; // ✅ Import multer for file uploads

const router = express.Router(); // ✅ Correct way to initialize the router

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.route("/register").post(
    upload.fields([
        {
            name: "avatar", // ✅ Fixed typo ("avtar" → "avatar")
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh_token").post(refreshAccessToken); // ✅ Fixed spelling
router.route("/changeCurrentPassword").post(verifyJWT, changeCurrentPassword);

export default router;
