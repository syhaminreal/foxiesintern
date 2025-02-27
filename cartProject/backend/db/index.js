// import mongoose from "mongoose";

// // import {DB_NAME}

//  const connectDB = async() =>{
//     try {
//       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}`)
//         console.log(`\n Mongo Db connected: ${connectionInstance.connection.host}`)

//     } catch (error) {
//         console.log("Error", error)
//         exist(1)
        
//     }
//  } 

// export default connectDB
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`\nMongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error", error);
    process.exit(1); // Fix: use process.exit() instead of exit()
  }
};

export default connectDB;
