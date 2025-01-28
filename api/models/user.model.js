

import jwt from "jsonwebtoekn"
import bcrypt from "bcrypt"

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
        }
    }
)