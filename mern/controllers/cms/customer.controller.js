const { showError } = require("../../lib");
const { User } = require("../../models");

class CustomersController {
    index = async (req, res, next) => {
        try {
            const customers = await User.find({ type: 'Customer' });
            res.json(customers);
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

            await User.create({ name, email, password: hash, phone, address, status, type: 'Customer' });

            res.status(201).json({
                success: "Customer created.",
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
            const customer = await User.findById(req.params.id);

            if (customer) {
                res.json(customer);
            } else {
                next({
                    message: "Customer not found",
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

            const customer = await User.findByIdAndUpdate(
                req.params.id,
                { name, phone, address, status },
                { new: true }
            );

            if (customer) {
                res.json({ success: "Customer Updated." });
            } else {
                next({
                    message: "Customer not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const customer = await User.findByIdAndDelete(req.params.id);

            if (customer) {
                res.json({ success: "Customer removed." });
            } else {
                next({
                    message: "Customer not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };
}

module.exports = new CustomersController();
