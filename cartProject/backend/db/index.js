import mongoose from "mongoose";

// import {DB_NAME}

 const connectDB = async() =>{
    try {
      const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n Mongo Db connected: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("Error", error)
        exist(1)
        
    }
 } 

export default connectDB