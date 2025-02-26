// require('dotenv').config({path: './env'})
import dotenv from "../env"
import {connectDB} from "./db/index.js"


dotenv.config({
    path : './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})

.catch((err) => {
    console.log("MONGO db connection failed !!!", err)})


















































// import mongoose from "mongoose";
// import express from "express";

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log("Database connected successfully");

//         app.on("error", (error) => {
//             console.error("Express Error:", error);
//             throw error;
//         });

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         });

//     } catch (error) {
//         console.error("Database Connection Error:", error);
//         throw error; // Corrected the typo (was `throw err`)
//     }
// })();
