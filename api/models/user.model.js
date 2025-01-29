import { Schema } from "mongoose"

const mongoose = require(mongoose)



const userSchema = new schema (
    {
        username: {
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required:true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type: String, //cloundanry url
        }, 
        watchHistory: {
            type: Schema.Types.ObjectId,
            ref: "Video"
        },
        password: {
            type: String,
            required:  [true, 'Password is required']
        },
        refeshToken: {
            type: String,
        }
    },
    {
        Timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)