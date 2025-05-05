const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");

const multipleChoiceQuestionController = require("../controllers/multipleChoiceQuestion");

router.post(
  "/create",
  verifyToken,
  checkAdmin,
  multipleChoiceQuestionController.createQuestion
);
router.put(
  "/update/:id",
  verifyToken,
  checkAdmin,
  multipleChoiceQuestionController.updateQuestion
);
router.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,
  multipleChoiceQuestionController.deleteQuestion
);
router.get(
  "/getAll",
  verifyToken,
  checkAdmin,
  multipleChoiceQuestionController.getAllQuestion
);
router.get(
  "/getOne/:id",
  verifyToken,
  checkAdmin,
  multipleChoiceQuestionController.getOneQuestion
);
router.get(
  "/count",
  verifyToken,
  checkAdmin,
  multipleChoiceQuestionController.countQuestions
);
module.exports = router;
