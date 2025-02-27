const express = require('express');
const authRoutes = require("./auth")
const cmsRoutes = require("./cms")
const {auth, cmsUser} = require("../lib")

const router = express.Router();


router.use(authRoutes)
router.use('/cms', auth, cmsUser, cmsRoutes)



// 404 handler for any unmatched routes
router.use((req, res, next) => {
    next({
       message: "Resource not found",
        status: 404
    });
})

module.exports = router















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