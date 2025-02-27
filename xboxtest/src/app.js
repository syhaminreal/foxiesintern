import express from "express"
import cors from  "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credendtials: true
}))

app.use(express.json(
    {
        limit: "16Kb"
    }
))

app.use(express.urlencoded({extended: true, limit: "16kb"}))

app.use(express.static("public"))

app.use(cookieParser())

//Routes
import userRouter from "./routes/user.routes.js"

//routes declartion
app.use("/api/v1/users", userRouter)

// http:localhost:8000/v1/users/register


//define the frontend ports or origin 

export { app }