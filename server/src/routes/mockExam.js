const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");
const mockExamController = require("../controllers/mockExam");

router.post(
  "/create",
  verifyToken,
  checkAdmin,
  mockExamController.createMockExam
);
router.put(
  "/update/:id",
  verifyToken,
  checkAdmin,
  mockExamController.updateMockExam
);
router.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,
  mockExamController.deleteMockExam
);
router.get(
  "/getOne/:id",

  mockExamController.getOneMockExam
);
router.get(
  "/getAll",

  mockExamController.getAllMockExam
);
router.get("/getRecent", mockExamController.getRecentMockExam);
router.get(
  "/exportPDF/:id",
  verifyToken,
  checkAdmin,
  mockExamController.exportMockExam
);
module.exports = router;
