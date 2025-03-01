const { showError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require('bcryptjs');

class StaffsController {
    index = async (req, res, next) => {
        try {
            const staffs = await User.find({ type: 'Staff' });
            res.json(staffs);
        } catch (error) {
            showError(error, next);
        }
    };

    store = async (req, res, next) => {
        try {
            const { name, email, password, confirm_password, phone, address, status } = req.body;

            if (password !== confirm_password) {
                return next({
                    message: "Password not confirmed",
                    status: 422,
                });
            }

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

            await User.create({ name, email, password: hash, phone, address, status, type: 'Staff' });

            res.status(201).json({
                success: "Staff created.",
            });

        } catch (err) {
            let message = {};

            if (err.code === 11000) {  // Check for duplicate email error
                message = {
                    email: "Email is already in use",
                };
            } else if (err.errors) {  // Handle validation errors
                for (let k in err.errors) {
                    message[k] = err.errors[k].message;
                }
            } else {
                return showError(err, next);  // Pass unknown errors to showError
            }

            next({
                message,
                status: 422,
            });
        }
    };

    show = async (req, res, next) => {
        try {
            const staff = await User.findById(req.params.id);

            if (staff) {
                res.json(staff);
            } else {
                next({
                    message: "Staff not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };

    update = async (req, res, next) => {
        try {
            const { name, phone, address, status } = req.body;

            const staff = await User.findByIdAndUpdate(
                req.params.id,
                { name, phone, address, status },
                { new: true }
            );

            if (staff) {
                res.json({ success: "Staff Updated." });
            } else {
                next({
                    message: "Staff not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
        next({
            message,
            status:422
        })
    };

    destroy = async (req, res, next) => {
        try {
            const staff = await User.findByIdAndDelete(req.params.id);

            if (staff) {
                res.json({ success: "Staff removed." });
            } else {
                next({
                    message: "Staff not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };
}

module.exports = new StaffsController();
