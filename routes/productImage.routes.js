const { Router } = require("express");

const auth = require("../middlewares/auth.middleware");

const ProductImage = require("../models/ProductImage");

const router = Router();

router.post("/add", auth, async (req, res) => {
  try {
    const id = req.body.productId;
    const existing = await ProductImage.findOne({ id });

    if (existing) {
      return req.json({ text: 'Такое изображение уже есть' });
    }

    const productImage = new ProductImage({ productId: id, data: req.body.data });

    await productImage.save();

    res.status(201).json();
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

router.put("/edit", auth, async (req, res) => {
  try {
    const editedImage = req.body;

    await ProductImage.updateOne(
      { _id: editedImage._id },
      { $set: editedImage }
    );

    res.status(201).json(editedImage);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:productId", auth, async (req, res) => {
  try {
    const photo = await ProductImage.findOne({ productId: req.params.productId });

    res.status(200).json(photo);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
