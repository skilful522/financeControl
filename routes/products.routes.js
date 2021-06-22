const { Router } = require("express");

const auth = require("../middlewares/auth.middleware");

const PrivateProduct = require("../models/PrivateProduct");

const router = Router();

router.get("/", auth, async (req, res) => {
  try {
    const products = await PrivateProduct.find();

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const product = await PrivateProduct.findById(req.params.id);

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
