const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");

const trueFalseQuestionController = require("../controllers/trueFalseQuestion");

router.post(
  "/create",
  verifyToken,
  checkAdmin,
  trueFalseQuestionController.createQuestion
);
router.put(
  "/update/:id",
  verifyToken,
  checkAdmin,
  trueFalseQuestionController.updateQuestion
);
router.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,
  trueFalseQuestionController.deleteQuestion
);
router.get(
  "/getAll",
  verifyToken,
  checkAdmin,
  trueFalseQuestionController.getAllQuestion
);
router.get(
  "/getOne/:id",
  verifyToken,
  checkAdmin,
  trueFalseQuestionController.getOneQuestion
);
router.get(
  "/count",
  verifyToken,
  checkAdmin,
  trueFalseQuestionController.countQuestions
);
module.exports = router;
