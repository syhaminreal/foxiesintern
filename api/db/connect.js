const { connection } = require("mongoose")

const mongoose = require(mongoose)

const connectDb = async () => {
    try{
        const connection = await mongoose.connect(`$process.env.DBUrl`)//monoogse uri form env //
        console.log(`Mongo db connected sucesfully :${connectionInstance.connection.host}`)

    }catch(eror){
        console.log("eror  while connecting with the data base", error)
        process.exit(1)
    }
}

export default connectDb

//dotenv.config({
//
//const dotenv = requires('dotenv')