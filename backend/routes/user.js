const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/search", auth, async (req, res) => {
  const query = req.query.q;

  if (!query) return res.json([]);

  const users = await User.find({
    username: { $regex: query, $options: "i" },
    _id: { $ne: req.userId }, 
  }).select("_id username");

  res.json(users);
});

module.exports = router;
