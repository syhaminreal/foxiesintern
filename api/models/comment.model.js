import mongoose from "mongoose";
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2");


const CommentSchema = new Schema (
    {
        content:{
            type: String,
            required: true
        },
        video: {
            type: Schema.types.ObjectId,
            ref: "Video"
        },
        Owner: {
            type: Schema.types.ObjectId,
            ref: "User"
        }

    },{
        timestamp:true
    }
)
// Apply pagination plugin
CommentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("comment",CommentSchema)