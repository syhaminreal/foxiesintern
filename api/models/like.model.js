import mongoose from "mongoose";

const likeSchema = new Schema({
    video: {
        type: Schema.types.ObjectId,
        ref: "Video"
    },
    comment: {
        type: Schema.types.ObjectId,
        ref: "Comment"
    },
    tweet: {
        type: Schema.types.ObjectId,
        ref: "tweet"
    },
    likedBy: {
        type: Schema.types.ObjectId,
        ref: "User"
    },
},
{timestamp:true})

export const Like = mongoose.model("Like",likeSchema)
