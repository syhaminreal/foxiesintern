import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define the User Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // Indexing email for efficient lookups
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // Assuming it's a URL or path
      required: true,
    },
    coverImage: {
      type: String, // Assuming it's a URL or path
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video", // Referring to Video model
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"], // Ensuring password is required
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true, // This will automatically add `createdAt` and `updatedAt` fields
  }
);

// Hash password before saving (only if password is modified)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Proceed if password is not modified

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(this.password, 10); // 10 rounds of hashing
    this.password = hashedPassword;
    next(); // Proceed to save the user
  } catch (error) {
    next(error); // Pass the error to the next middleware (error handler)
  }
});

// Compare hashed password with the provided password during login
userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password); // Compare provided password with hashed password
  } catch (error) {
    throw new Error("Password comparison failed.");
  }
};

// Generate an access token (JWT) for the user
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the token
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Expiry time for the access token
    }
  );
};

// Generate a refresh token (JWT) for the user
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the refresh token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Expiry time for the refresh token
    }
  );
};

// Export the User model
export const User = mongoose.model("User", userSchema);
