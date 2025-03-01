const express = require('express');
const authRoutes = require("./auth")
const profileRoutes = require("./profile")
const cmsRoutes = require("./cms")
const frontRoutes = require("./front")
const {auth, cmsUser} = require("../lib")

const router = express.Router();


router.use(authRoutes)

router.use(frontRoutes)

router.use('/cms', auth, cmsUser, cmsRoutes)

router.use(auth,profileRoutes)

// 404 handler for any unmatched routes
router.use((req, res, next) => {
    // console.log(`[$(req.method)] ${req.url}`)
    next({
       message: "Resource not found",
        status: 404
    });
})

module.exports = router









// https://broadwaynp.sharepoint.com/sites/MERNStackClass130PMMay15Nitishsir/_layouts/15/stream.aspx?id=%2Fsites%2FMERNStackClass130PMMay15Nitishsir%2FShared%20Documents%2FGeneral%2FRecordings%2FMeeting%20in%20%5FGeneral%5F%2D20230709%5F131427%2DMeeting%20Recording%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2E5eadd9c5%2D74d4%2D467c%2D9d2c%2D004045a056b5 july 8





// const {User, Category} = require("../models")

// // Auth middleware
// const auth = (req, res, next) => {
//     const loggedIn = false

//     if (loggedIn) {
//         next() // Continue to the next middleware/route handler
//     } else {
//         next(new Error('Not logged in')) // Pass error to next middleware
//     }
// }

// // Define routes
// router.get('/', async(req, res, next) => {
//    const users = await User.find()
//    const categories = await Category.find()
//    res.json({
//     users,
// categories
// })
//     })
// 

// // Example POST route with auth middleware
// router.post('/about/:num', auth, (req, res, next) => {
//     res.json({
//         url: req.url,
//         method: req.method,
//         params: req.params,
//         query: req.query
//     })
// })


// // Error handling middleware
// router.use((err, req, res, next) => {
//     res.status(500).json({
//         error: err.message || 'Internal Server Error'
//     })
// })