import mongoose , {Schema} from "mongoose"

const subscriptionSchema =  newSchema({
    subscriber: {
        type: Schema.Types.ObjectId, //one who is subscribing
        ref: "Users"
    }, 
       channel: {
         type: Schema.Types.ObjectId, //one who to whom the subsccribe is subscribing
        ref: "Users"

       } 
    

},
{Timestamps : true})



export const subscription = mongoose.model(
    "Subscripton", subscriptionSchema)