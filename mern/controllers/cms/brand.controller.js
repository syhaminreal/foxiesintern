const { showError, validationError } = require("../../lib");
const { Brand } = require("../../models");

class BrandsController {
    index = async (req, res, next) => {
        try {
            const brands = await Brand.find();
            res.json(brands);
        } catch (error) {
            showError(error, next);
        }
    };

    store = async (req, res, next) => {
        try {
            const { name, status } = req.body;

            await Brand.create({ name, status });

            res.status(201).json({
                success: "Brand created.",
            });

        } catch (err) {
            validationError(err, next)
           
        }
    };

    show = async (req, res, next) => {
        try {
            const brand = await Brand.findById(req.params.id);

            if (brand) {
                res.json(brand);
            } else {
                next({
                    message: "Brand not found",
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

            const brand = await Brand.findByIdAndUpdate(
                req.params.id,
                { name, status },
                { new: true }
            );

            if (brand) {
                res.json({ success: "Brand Updated." });
            } else {
                next({
                    message: "Brand not found",
                    status: 404,
                });
            }
        } catch (err) {
            validationError(err, next)
        }
    };

    destroy = async (req, res, next) => {
        try {
            const brand = await Brand.findByIdAndDelete(req.params.id);

            if (brand) {
                res.json({ success: "Brand removed." });
            } else {
                next({
                    message: "Brand not found",
                    status: 404,
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };
}

module.exports = new BrandsController();
