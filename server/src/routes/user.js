const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");
const userController = require("../controllers/user");
const upload = require("../utils/upload");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/updateProfile",
  upload.single("avatar"),
  verifyToken,
  userController.updateProfile
);
router.get("/get", verifyToken, userController.getUser);
module.exports = router;
