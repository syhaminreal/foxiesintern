const registerUser = asyncHandler(async(req, res) => {
    res.status(200).json({
        message: "ok"
    })
//steps of reg user 
//get user detILS from forntend
// validation not empty and uniques fileds
//check if user already exists: username nad email
//cover image and avtar are also files. if avilable
//upolad them to the cloudinary
//check if the multer has uploaded it or not
//create a user object- crate entery in db
//removw the password and refresh token form the response
//check if the response for user creation msg avilabe or not 
//return the respone
//deeps make a man

const  { fullname,  email, usename, passowrd} = req.body
console.log("email: ", email)
})
export {
    registerUser,

}
