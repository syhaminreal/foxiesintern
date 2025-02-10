import { User } from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"; 
import { sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/emails.js';


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

  }
}

export const login = async (req, res) => {
  res.send("login route");
};

export const logout = async (req, res) => {
  res.send("logout route");
};
