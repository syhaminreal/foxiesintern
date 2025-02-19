const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Fetch all registered users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/users", (req, res) => {
  res.json([{ id: 1, name: "John Doe" }]);
});

module.exports = router;
