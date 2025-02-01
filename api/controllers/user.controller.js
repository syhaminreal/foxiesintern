import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAcessAndRefeshTokens = async(userId) => {
    try{
     const user =  await User.findById(userId)
     const acessToken  =   user.generateAcessToken()
     const refeshToken  =   user.generateRefeshToken()

     user.refeshToken = refeshToken
   await user.save({validateBeforeSave : false })

   return {acessToken, refeshToken}


    } catch (error) {
        throw new ApiError(500, "Somethimg went worng while gentrating tefesha nd acess token")
    }
} 

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


const loginUser = asyncHandler(async (req, res) =>{

    //usern name email and password req body => data
    //user name or email
    //find the user
    //password match
    //acess a nd refesh token
    //role check
    //send the values through cookie
    //send responce of beong complted

    const {email, usename, password} = req.body
    if (!username || email){
        throw new ApiError(400, "username or email is required")
    }

   const user = await  User.findOne({
        $or: [{username}, {email}]})
})

if(!user){
    throw new ApiError(404," User does not exist")
}
const isPasswordValid = await user.isPasswordCorrect(password)
if(!isPasswordValid){
 throw new ApiError(401,"Invalid user credentials")

}

    const {acessToken, refeshToken} = await generateAcessAndRefeshTokens(user._id)

   const loggedInUser = await  User.findById(user._id).select("-password -refeshToken")


   const options = {
    httpsOnly : true,
    secure: true
   }

   return res.status(200)
   .cookie("acessToekn", accessToken,  options)
   .cookie("refeshToken", refeshToken, options)
   .json(
    new ApiResponse(
        200, {
            user: loggedInUser, acessToken,
            refrehToken
        },
        "User loggged in Sucessfully"
    )
   )



   const logoutUser = asynchandler(async(req, res) => {
    
   })


export { registerUser,
    loginUser,
    logoutUser
 };
