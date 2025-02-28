const { showError, validationError } = require("../../lib");
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
            validationError(err, next)
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
            validationError(err, next)
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
