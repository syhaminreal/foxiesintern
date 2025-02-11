import { User } from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; 
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';
import crypto from "crypto"
//sign up
export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24hrs
    });

    await user.save();

    // Generate JWT token and set cookie
    generateTokenAndSetCookie(res, user._id);

    //send verification token


    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


//verify email
export const verifyEmail = async (req, res) => {
//user can enter verification code
  const {code} = req.body
  try{
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}

    })

    if(!user){
      return res.status(400).json({sucess: false, message: "Invalid or expired verification code"})

    }
    user.isVerified = true
    user.verificationToken = undefined,
    user.verificationTokenExpiresAt = undefined
    await user.save()
await sendWelcomeEmail(user.email, user.name)
 res.status(200).json({
  sucess: true,
  message: "Email verified sucessfully",
  user: {
  ...user._doc,
password: undefined,
}
 })
  }catch(error){
    console.log("error in Verification", error)
    res.status(500).json({sucess:false, message: "Server error"})

  }
}

//login user
export const login = async (req, res) => {
  // res.send("login route");
  try{
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({ sucess: false, message: "Invalid credidentials"})

    }
    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if(!isPasswordValid) {
      return res.status(400).json({ sucess: false, message: "Invalid credenditals"})
    }
    generateTokenAndSetCookie(res, user._id)

    user.lastLogin = new Date()
    await user.save()

    res.status(200).json({
      sucess: true,
      message: "logged in sucessfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })

  }catch(error){
    console.log("Error in loggin",error)
    res.status(400).json({ sucess: false,  message: error.message})

  }
};

export const logout = async (req, res) => {
  // res.send("logout route");
  res.clearcookie("token")
  res.status(200).json({ sucess: true, message: "Logged out sucessfully"})
};


//forgot password
export const forgotPassword = async (req, res) => {
  const { email} = req.body
  try{
  const user = await user.findOne({ email })

  if(!user){
    return res.status(400).json({success: false, message: "USer not found"})
  }
//generate reset token
const resetToken = crypto.randomBytes(20).toString("hex")
const resetTokenExpiresAt =  Date.now() +1 *60*60*1000 //1 hour

user.resetPasswordToken = resetToken
user.resetPasswordExpiresAt = resetTokenExpiresAt

await user.save()

//send email 
await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/reset-passowrd/${resetToken}`)

  }catch(error){
    console.log("Error in lresting email",error)
    res.status(400).json({ sucess: false,  message: error.message})


  }

}

//reset password
export const resetPassword =async (req, res) => {
  try{

const  {token} = req.params
const{password} = req.body

const user =await User.findOne({
  resetPasswordToken: token,
  resetPasswordExpiresAt: { $gt: Date.now()},
})
if(!user){
  return res.status(400).json({sucess:false, message: "Invalid or expired reset token"})
}

//update password
const hashedPassword = await bcryptjs.hash(password,10)
user.password = hashedPassword
user.resetPasswordExpiresAt = undefined
await user.save()


await sendResetSuccessEmail(user.email)

res.status(200).json({sucess: true, message: "Password reset sucessful"})
  }catch(error){
    console.log("Error in resetPassword", error)
    res.status(400).json({sucess: false, message: error.message})

  }
}


//check auth
export const checkAuth = async(req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password")
    if(!user){
      return res.status(400).json({ sucess: false, message: "User not found"})
    }

    res.status(200).json({ sucess: true, user})
  } catch (error) {
    console.log("Error in checkAuth", error)
    res.status(400).json({sucess: false, message: error.message})


    
  }

}