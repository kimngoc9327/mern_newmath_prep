const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");

const shortAnswerQuestionController = require("../controllers/shortAnswerQuestion");

router.post(
  "/create",
  verifyToken,
  checkAdmin,
  shortAnswerQuestionController.createQuestion
);
router.put(
  "/update/:id",
  verifyToken,
  checkAdmin,
  shortAnswerQuestionController.updateQuestion
);
router.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,
  shortAnswerQuestionController.deleteQuestion
);
router.get(
  "/getAll",
  verifyToken,
  checkAdmin,
  shortAnswerQuestionController.getAllQuestion
);
router.get(
  "/getOne/:id",
  verifyToken,
  checkAdmin,
  shortAnswerQuestionController.getOneQuestion
);

module.exports = router;
