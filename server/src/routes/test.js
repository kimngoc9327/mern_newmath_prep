const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");
const testController = require("../controllers/test");

router.post("/create", verifyToken, checkAdmin, testController.createTest);
router.get("/getAll", testController.getAllTest);
router.get("/getOne/:id", verifyToken, testController.getOneTest);
router.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,
  testController.deleteTest
);
router.get("/getRecent", testController.getRecentTest);
router.put("/update/:id", verifyToken, checkAdmin, testController.updateTest);
module.exports = router;
