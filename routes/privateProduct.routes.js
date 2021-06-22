const { Router } = require("express");
const shortId = require("shortid");
const multer = require('multer');

const auth = require("../middlewares/auth.middleware");

const PrivateProduct = require("../models/PrivateProduct");

const router = Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './front/public/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

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

router.put("/edit", auth, upload.single('photo'), async (req, res) => {
  try {
    const editedProduct = { ...req.body, photo: req.file.originalname };

    await PrivateProduct.updateOne(
      { _id: editedProduct._id },
      { $set: editedProduct }
    );

    res.status(201).json();
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
