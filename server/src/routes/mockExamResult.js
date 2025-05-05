const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");

const mockExamResultController = require("../controllers/mockExamResult");

router.post(
  "/create/:id",
  verifyToken,
  mockExamResultController.createMockExamResult
);
router.get(
  "/getOne/:id",
  verifyToken,
  mockExamResultController.getMockExamResult
);
module.exports = router;
