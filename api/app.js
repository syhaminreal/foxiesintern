 const express = require(express)

 const app = express()

//routes imported

import userRouter from "./routes/user.route.js"


//routes declaration

app.use("/api/V1/users", userRouter)



//https:localhost:8000/api/v1/users/register
//https:localhost:8000/api/v1/users/login
 export {app}