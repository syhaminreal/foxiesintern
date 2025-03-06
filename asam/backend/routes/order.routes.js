const express = require('express');
const router = express.Router();
const OrdersController = require('../../controllers/orders/orders.controller');

// Route to get all orders
router.get('/orders', OrdersController.index);

// Route to update the status of an order
router.put('/orders/:id', OrdersController.update);

// Route to delete an order
router.delete('/orders/:id', OrdersController.destroy);

module.exports = router;
