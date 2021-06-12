const { Router } = require("express");

const auth = require("../middlewares/auth.middleware");

const User = require("../models/User");

const router = Router();

router.get("/usersAmount", auth, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users.length);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
