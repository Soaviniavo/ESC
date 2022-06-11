const express = require("express");
const router = express.Router();
const multer = require("multer");

const extractController = require("../controllers/extract");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });
router.post("/extract", extractController.Extract);
router.use("/annuler", extractController.Annuler);
router.post("/uploads", upload.array("files"), extractController.uploads);
router.use(extractController.verify);

module.exports = router;
