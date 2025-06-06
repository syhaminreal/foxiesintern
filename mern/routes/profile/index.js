const express = require("express");
const ProfileCtrl = require("../../controllers/ProfileController");

const router = express.Router();

router.get("/profile/details", ProfileCtrl.details);

router.put("/profile/edit", ProfileCtrl.profile);
router.patch("/profile/edit", ProfileCtrl.profile);

router.put("/profile/password", ProfileCtrl.password);
router.patch("/profile/password", ProfileCtrl.password);

router.post("/products/:id/review", ProfileCtrl.addReview);

router.get("/profile/reviews", ProfileCtrl.reviews);

router.get("/profile/orders", ProfileCtrl.orders); // Added orders route

router.post("/checkout", ProfileCtrl.checkout); // Added checkout route

module.exports = router;
