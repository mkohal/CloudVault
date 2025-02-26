const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const fileModel = require("../models/fileModel");

// auth middleWare se kya hoga ki user home page pe tabhi jaa sakta hai jb vo logged in ho

router.get("/files", authMiddleware, async (req, res) => {
  const userFiles = await fileModel.find({
    user: req.user.userId,
  });
  //   console.log("Files from DB", userFiles);
  res.json({
    files: userFiles,
  });
});

module.exports = router;
