import express from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, changeCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import multer from "multer"; // ✅ Import multer for file uploads
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT,getCurrentUser)
router.route("/update0account").patch(verifyJWT, updateAccountDetails)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/coverimage").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)
router.route("/c/:username").get(verifyJWT,getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router;
