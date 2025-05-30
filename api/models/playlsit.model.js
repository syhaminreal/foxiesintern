import mongoose from "mongoose";

const PlaylistSchema = new Schema({
    name: {
        type :String,
        required: true
    },
    description:{
        type: String,
        required :true
    },
    Videos:[
        {
        type: Schema.Types.ObjectId,
        ref: "Video",
      
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
},
    {timestamp:true}
)

export const Playlist = mongoose.model("Playlsit", PlaylistSchema)

