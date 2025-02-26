const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fileModel = require("../models/fileModel");
const authMiddleware = require("../middleware/authMiddleware");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Manually set storage folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/upload",
  authMiddleware,
  upload.single("dropzone-file-upload"),
  async (req, res) => {
    try {
      console.log("Received file:", req.file);
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log("Upload result:", result);
      console.log(result.url);
      res.status(200).json({
        success: true,
        message: "File uploaded successfully!",
        file: {
          originalname: req.file.originalname,
          public_id: result.public_id,
          format: result.format,
        },
      });

      // yeh data hum apne mongoDB database mai bhejege Files collection mai
      const newFile = await fileModel.create({
        path: req.file.path,
        originalname: req.file.originalname,
        user: req.user.userId, // yeh id humne req.user mese le liya kyuki middleware ki vja se req.user mai decoded ka saara data chla jayega(file auth.js)
        public_id: result.public_id, // yeh signed url bnane mai kam ayegi
        format: result.format,
      });
      console.log(newFile);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      res.status(500).json({
        success: false,
        message: "Error uploading file!",
      });
    }
  }
);

module.exports = router;

