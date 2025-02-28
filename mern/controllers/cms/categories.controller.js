const { showError } = require("../../lib");
const { Category } = require("../../models");

class CategoriesController {
    index = async (req, res, next) => {
        try {
            const categories = await Category.find();
            res.json(categories);
        } catch (error) {
            showError(error, next);
        }
    };

    store = async (req, res, next) => {
        try {
            const { name, status } = req.body;

            await Category.create({ name, status });

            res.status(201).json({
                success: "Category created.",
            });

        } catch (err) {
            let message = {};

            if (err.code === 11000) {  // Check for duplicate category name error
                message = {
                    name: "Category name is already in use",
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
            const category = await Category.findById(req.params.id);

            if (category) {
                res.json(category);
            } else {
                next({
                    message: "Category not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };

    update = async (req, res, next) => {
        try {
            const { name, status } = req.body;

            const category = await Category.findByIdAndUpdate(
                req.params.id,
                { name, status },
                { new: true }
            );

            if (category) {
                res.json({ success: "Category Updated." });
            } else {
                next({
                    message: "Category not found",
                    status: 404,
                });
            }
        } catch (error) {
            let message = {};

            if (err.code === 11000) {  // Check for duplicate category name error
                message = {
                    name: "Category name is already in use",
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

    destroy = async (req, res, next) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);

            if (category) {
                res.json({ success: "Category removed." });
            } else {
                next({
                    message: "Category not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };
}

module.exports = new CategoriesController();
