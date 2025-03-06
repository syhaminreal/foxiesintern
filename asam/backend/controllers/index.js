const ProductController = require('./productController');  // Import ProductController
const OrderController = require('./orderController');      // Import OrderController
const ListController = require('./listController');        // Import ListController
const AuthController = require('./authController');        // Import AuthController

// Export all controllers in an object for easy access
module.exports = {
    ProductController,
    OrderController,
    ListController,
    AuthController
};
