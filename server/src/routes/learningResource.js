const express = require("express");
const router = express.Router();
const { verifyToken, checkAdmin } = require("../middlewares/auth");

const learningResourceController = require("../controllers/learningResource");

router.post(
  "/create",
  verifyToken,
  checkAdmin,
  learningResourceController.createLearningResource
);
router.put(
  "/update/:id",
  verifyToken,
  checkAdmin,
  learningResourceController.updateLearningResource
);
router.delete(
  "/delete/:id",
  verifyToken,
  checkAdmin,

  learningResourceController.deleteLearningResource
);
router.get(
  "/getOne/:id",

  learningResourceController.getOneLearningResource
);
router.get(
  "/getAll",

  learningResourceController.getAllLearningResource
);
router.get(
  "/getRecent",

  learningResourceController.getRecentLearningResource
);

module.exports = router;
