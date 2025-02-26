const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fileModel = require("../models/fileModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/download/:public_id", authMiddleware, async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;
    const public_id = req.params.public_id;

    // Find the file in the database
    const file = await fileModel.findOne({
      user: loggedInUserId,
      public_id: public_id,
    });

    if (!file) {
      return res
        .status(401)
        .json({ message: "Unauthorized or file not found!" });
    }

    console.log("Public ID in DB:", file.public_id);
    console.log("Stored Format in DB:", file.format);

    const format = file.format; // Default format

    // Generate signed URL
    const signedUrl = cloudinary.url(public_id, {
      secure: true,
      sign_url: true,
      format: format,
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    console.log("Generated Signed URL:", signedUrl);
    return res.json({ signedUrl });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error!", error: error.message });
  }
});

module.exports = router;
