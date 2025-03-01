const { showError } = require("../../lib");

class ProductController {
    latest = async (req, res, next) => { 
        try {
            // API in sort
            const products = await Product.find({ status: true })
                .sort({ createdAt: -1 })
                .exec();

            res.json(products);
        } catch (error) {
            showError(error, next);
        }
    };

    featured = async (req, res, next) => {
        try {
            // API in sort
            const products = await Product.find({ status: true, featured: true }).exec();
            res.json(products);
        } catch (error) {
            showError(error, next);
        }
    };

    topSelling = async (req, res, next) => {
        try {
            // API in sort
            const products = await Product.aggregate([
                { $match: { status: true } },
                {
                    $lookup: {
                        from: "orderdetails",
                        localField: "_id",
                        foreignField: "productID",
                        as: "ordercount"
                    }
                },
                { $addFields: { order_count: { $size: "$ordercount" } } }
            ])
            .sort({ order_count: -1 })
            .exec();

            res.json(products);
        } catch (error) {
            showError(error, next);
        }
    };

    byId = async (req, res, next) => {
        try {
            // findById also ok or findOne
            const product = await Product.findOne({ _id: req.params.id, status: true, featured: true }).exec();
            res.json(product);
        } catch (error) {
            showError(error, next);
        }
    };

    byCategoryId = async (req, res, next) => {
        try {
            const products = await Product.find({ categoryId: req.params.id, status: true }).exec();
            res.json(products);
        } catch (error) {
            showError(error, next);
        }
    };

    byBrandId = async (req, res, next) => {
        try {
            const products = await Product.find({ brandId: req.params.id, status: true }).exec();
    
            if (products.length) {
                res.json(products);
            } else {
                next({
                    message: "Resource not found",
                    status: 404
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };

    similar = async (req, res, next) => {
        try {
            const productsByBrand = await Product.find({ brandId: req.params.id, status: true }).exec();

            if (productsByBrand.length) {
                const productsByCategory = await Product.find({ categoryId: req.params.id, status: true }).exec();
                res.json(productsByCategory);
            } else {
                next({
                    message: "Resource not found",
                    status: 404
                });
            }
        } catch (error) {
            showError(error, next);
        }
    };

    search = async (req, res, next) => {};
}

module.exports = new ProductController();
