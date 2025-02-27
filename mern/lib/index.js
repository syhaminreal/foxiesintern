const jwt = require('jsonwebtoken')
const { User } = require('../models')


const showError = (error, next) => {
    console.log(error)
    next({message: 'Problem while processing request',
        status: 400
    })
}

const auth = async (req, res, next) => {
    if ('authorization' in req.headers) {
        const token = req.headers.authorization.split(' ')[1]; // Correct token extraction

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);

            if (user) {
                if (user.status) {
                    req.user = user;
                    next(); // Proceed if user is found and active
                } else {
                    next({
                        message: "Inactive account",
                        status: 403
                    });
                }
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            next({
                message: 'Invalid Token or User not found',
                status: 401
            });
        }
    } else {
        next({
            message: 'Token missing.',
            status: 401
        });
    }
};


const cmsUser = async (req, res, next) =>{
    if(req.user.type != 'Customer') {
        next()
    }else {
        next({
            message: "Access Denied",
            status: 403
        })
    }

}

const AdminUser = async (req, res, next) => {
    if (req.user.type === 'Admin') {
        next(); // Allow access to Admin
    } else {
        next({
            message: "Access Denied",
            status: 403
        });
    }
}

module.exports = {showError, auth, cmsUser, AdminUser}