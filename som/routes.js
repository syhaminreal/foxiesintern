const express = require("express"); // Fixed import
const router = express.Router();
const User = require("./models/user.model");

router.post("/userInfo", async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await User.create({ username, password });
    console.log(data);
    res.status(200).json({
      message: "User Info saved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "User info failed to save", error: error.message });
  }
});

module.exports = router;
