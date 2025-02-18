import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"; // Correct import for ES Modules
import { pipeline } from "stream";

// Function to generate access and refresh tokens for a user
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

// User registration process
const registerUser = asyncHandler(async (req, res) => {

  // Steps for registering a user:
  // 1. Get user details from frontend
  // 2. Validate required fields (not empty and unique)
  // 3. Check if user already exists (username and email)
  // 4. Handle cover image and avatar if available
  // 5. Upload them to Cloudinary
  // 6. Check if Multer has uploaded them
  // 7. Create a user object and insert it into the database
  // 8. Remove password and refresh token from the response
  // 9. Return the response

  const { fullname, email, username, password } = req.body;
  console.log("Registering user with email:", email);

  if ([fullname, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Checking if a user with the given email or username already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  // Handling avatar and cover image uploads
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar to Cloudinary");
  }

  // Creating the user in the database
  const user = await User.create({
    fullname,
    avatar: avatar?.url || "",
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Removing sensitive fields directly while creating the user
  const { password: _, refreshToken: __, ...createdUser } = user.toObject();

  if(!createUser){
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully"));
});

// User login process
const loginUser = asyncHandler(async (req, res) => {
  // Steps for logging in a user:
  // 1. Get username/email and password from request body
  // 2. Validate that username/email is provided
  // 3. Find the user in the database
  // 4. Validate the provided password
  // 5. Generate access and refresh tokens
  // 6. Check user role if needed
  // 7. Store tokens in HTTP-only cookies (with security best practices)
  // 8. Send user details and tokens as a response

  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "Username or email is required");
  }

  // Finding the user by username or email
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Checking if the password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect username or password");
  }

  // Generating access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  // Fetching user details without password and refresh token
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Cookie options for storing the tokens securely
  const options = {
    httpOnly: true, // Prevents JavaScript access to cookies
    secure: process.env.NODE_ENV === "production", // Ensures cookies are only sent over HTTPS in production
    sameSite: "Strict", // Helps prevent CSRF attacks
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Refresh token valid for 7 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

// User logout process
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 }, //"" }, // Completely removes the refreshToken field
    },
    { new: true }
  );

  // Cookie options for security
  const options = {
    httpOnly: true, // Prevents JavaScript access to cookies
    secure: process.env.NODE_ENV === "production", // Ensures HTTPS only in production
    sameSite: "Strict", // Protects against CSRF attacks
  };

  return res
    .status(200)
    .clearCookie("accessToken", options) // Fixed typo
    .clearCookie("refreshToken", options) // Fixed typo
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

//refesh token end point
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Get refresh token from cookies or request body
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  // Verify the refresh token
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    // Generate new access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    // Cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//chnage the password of the user
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Ensure new password and confirm password match
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "New password and confirm password do not match");
  }

  // Fetch the user
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Validate old password
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  // Update password and save
  user.password = newPassword;
  await user.save({ validateBeforeSave: true }); // Ensure password hashing

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

//get current user

const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "User not authenticated");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});

//chnage other aresa account deatils
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  if (!fullname || !email) {
    throw new ApiError(400, "All fields are required");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "User not authenticated");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

//other end points for files update for the user files

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.path;

  // Check if avatar file is missing
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing.");
  }

  // Upload avatar to Cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  // Check if there was an issue uploading the avatar
  if (!avatar?.url) {
    throw new ApiError(400, "Error while uploading avatar.");
  }

  // Update the user's avatar URL in the database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  // Check if user was found
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar updated successfully."));
});

//update cover Image
const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  // Check if cover image file is missing
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing.");
  }

  // Upload cover image to Cloudinary
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // Check if there was an issue uploading the cover image
  if (!coverImage?.url) {
    throw new ApiError(400, "Error while uploading cover image.");
  }

  // Update the user's cover image URL in the database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");

  // Return success response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully."));
});

//rest the password using nodemailer and sending the password link
// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service like SendGrid
  auth: {
    user: "shya,9876yadav@gmail.com", // Your email
    pass: "shyam345yadav", // Your email password or app-specific password
  },
});

const sendOTPEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the email is provided
  if (!email) {
    throw new ApiError(400, "Email is required.");
  }

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  // Store OTP temporarily (e.g., in the user's model, session, or cache)
  // Here we're updating the user document directly for simplicity
  user.otp = otp;
  user.otpExpires = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes
  await user.save();

  // Prepare email content
  const mailOptions = {
    from: "yadav926yadav@gmail.com", // Sender address
    to: user.email, // Recipient address
    subject: "Your OTP for Resetting Password",
    text: `Your OTP for resetting your password is ${otp}. It is valid for 15 minutes.`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw new ApiError(500, "Error sending OTP email.");
    } else {
      console.log("OTP sent: " + info.response);
      return res
        .status(200)
        .json(new ApiResponse(200, null, "OTP sent to your email."));
    }
  });
});

//get userchannel infomration

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "Username is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        username: username.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: { $size: "$subscribers" },
        channelsSubscribedToCount: { $size: "$subscribedTo" },
        isSubscribed: {
          $cond: {
            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        fullname: 1,
        username: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
      },
    },
  ]);

  if (!channel || channel.length === 0) {
    throw new ApiError(404, "User channel not found");
  }
  //return
  return res.status(200).json;
  new ApiResponse(200, channel[0], "user channel fetched sucessfully");
});

//get watch hsitory and another pipelines
const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
            },
          },
          {
            $addFields: {
              owner: { $first: "$owner" },
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              description: 1,
              owner: {
                fullname: 1,
                username: 1,
                avatar: 1,
              },
            },
          },
        ],
      },
    },
  ]);

  if (!user || user.length === 0) {
    throw new ApiError(404, "User watch history not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "watch History fetched sucessfully"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  sendOTPEmail,
  getUserChannelProfile,
  getWatchHistory,
};
