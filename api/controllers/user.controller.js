import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  // 9. Ensure the user creation response is available
  // 10. Return the response

  const { fullname, email, username, password } = req.body;
  console.log("Email:", email);

  if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

  if (!avatar) {
    throw new ApiError(400, "Failed to upload avatar");
  }

  const user = await User.create({
    fullname, // Fixed typo: `fullName` → `fullname` (must match the object key)
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
});

export { registerUser };
