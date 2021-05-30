const { Router } = require("express");
const shortId = require("shortid");

const auth = require("../middlewares/auth.middleware");

const PrivateProduct = require("../models/PrivateProduct");

const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const id = shortId.generate();
    const existing = await PrivateProduct.findOne({ name });

    if (existing) {
      return req.json({ name });
    }

    const privateProduct = new PrivateProduct({
      id,
      owner: req.user.userId,
      ...req.body,
    });

    await privateProduct.save();

    res.status(201).json({ privateProduct });
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

router.put("/edit", auth, async (req, res) => {
  try {
    const editedProduct = req.body;

    console.log(editedProduct, "her");
    await PrivateProduct.updateOne(
      { _id: editedProduct._id },
      { $set: editedProduct }
    );

    res.status(201);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await PrivateProduct.find({ owner: req.user.userId });

    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await PrivateProduct.findById(req.params.id);

    await res.json(link);
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    const { ids } = req.body;

    await PrivateProduct.deleteMany({ _id: ids });

    res.json({ message: "Ссылка успешно удалена " });
  } catch (e) {
    res.status(500).json({ message: "что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
