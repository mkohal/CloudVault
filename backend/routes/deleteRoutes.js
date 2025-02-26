const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const fileModel = require("../models/fileModel");
const cloudinary = require("../config/cloudinary");

router.delete("/delete/:public_id", authMiddleware, async (req, res) => {
  try {
    const public_id = req.params.public_id;

    // Call Cloudinary API to delete image
    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      // Delete the file reference from MongoDB
      const deletedFile = await fileModel.findOneAndDelete({ public_id });

      if (!deletedFile) {
        return res
          .status(404)
          .json({ success: false, message: "File not found in database!" });
      }

      return res.json({
        success: true,
        message:`${deletedFile.originalname} deleted successfully!`
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Failed to delete file!",
        });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
});

module.exports = router;