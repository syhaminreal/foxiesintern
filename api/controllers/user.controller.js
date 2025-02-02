import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

// Function to generate access and refresh tokens for a user
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId)
    if (!user) throw new ApiError(404, "User not found")

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token")
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
  // 9. Ensure the user creation response is available
  // 10. Return the response

  const { fullname, email, username, password } = req.body;
  console.log("Email:", email);

  if ([fullname, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  // Checking if a user with the given email or username already exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
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
    throw new ApiError(400, "Failed to upload avatar");
  }

  // Creating the user in the database
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // Fetching the created user without sensitive fields
  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user");
  }

  return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"));
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
  // 7. Store tokens in HTTP-only cookies
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
    throw new ApiError(404, "User does not exist");
  }

  // Checking if the password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Generating access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  // Fetching user details without password and refresh token
  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  // Cookie options for storing the tokens
  const options = {
    httpOnly: true, // Secure and accessible only by the server
    secure: true, // Ensures cookies are only sent over HTTPS
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
const logoutUser =  asyncHandler(async(req, res) => {
 await User.findByIdAndUpdate(
  req.user._id,
  {
    $set:  {
      refreshToken: undefined
    }
  },
  {
    new: true
  }
)
const options = {
  httpOnly: true, // Secure and accessible only by the server
  secure: true, // Ensures cookies are only sent over HTTPS
};
return res.status(200)
.clearCookie("acessToken", options)
.clearCookie("refeshToken", options)
.json(new ApiResponse(200, {}, "User logged out"))
})

//refesh token end point
const refreshAcessToken = asyncHandler(async (req, res) => {
  request.cookes.refeshToekn || req.body.refreshToken

  if(!refeshToken) {
    throw  new ApiError(401, "unauthorizes request")
  }

  //verify the REFESH token
  try {
    
   const decodedToken =  jwt.verify(
      incomingRefreshToken,
      process.env.REFESH_TOKEN_SECRET
  
    )
    const user = await User.findById(decodedToken?._id)
    if(!user) {
      throw  new ApiError(401, "Invalid refesh token")
    }
  
    if(incomingRefreshToken !== user?.refeshToken){
      throw new ApiError(401, "Refesh token is expired or used")
    }
  
  const options = {
    httpOnly:  true,
    secure: true
  }
  
  const  {accessToken, newrefreshToken}=await generateAccessAndRefreshTokens(user._id)
  
  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refeshToken", newrefeshToken, options)
  .json(
    new ApiResponse(
      200, 
      {accessToken, refeshToke: newrefreshToken},
      "Access token refeshed"
    )
  )
  } catch (error) {
    throw new ApiError(401, error?.message || 
      "Invalid refesh token"
    )
    
  }

})

export { 
    registerUser,
     loginUser, 
     logoutUser,
    refreshAcessToken
  };
