const mongoose = require(mongoose)

const VideoSchema = new Schema(
    {
        videoFile: {
            type: string, // cloundanry url
            required : true
        }, 
        thumbnail: {
            type: string, // cloundanry url
            required : true
        }

    



},{
    Timestamp: true
}
)

export  const Video = mongoose("Video", VideoSchema)