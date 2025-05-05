const ShortAnswerQuestion = require("../models/shortAnswerQuestion");

const createQuestion = async (req, res) => {
  const { content, answer } = req.body;

  try {
    const newQuestion = new ShortAnswerQuestion({
      content,
      answer,
    });
    await newQuestion.save();
    res.status(200).json({
      success: true,
      newQuestion,
      message: "Create short answer question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Create short answer failed",
      error: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  const questionsId = req.params.id;
  const { content, answer } = req.body;
  try {
    const data = { content, answer };
    const update = await ShortAnswerQuestion.findByIdAndUpdate(
      questionsId,
      data,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: data,
      update: update,
      message: "Update short answer question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Update short answer question  failed",
      error: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  const questionsId = req.params.id;
  try {
    await ShortAnswerQuestion.findByIdAndDelete(questionsId);
    res.status(200).json({
      success: true,
      message: "Delete short answer question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Delete short answer question  failed",
      error: error.message,
    });
  }
};

const getOneQuestion = async (req, res) => {
  const questionsId = req.params.id;
  try {
    const getOne = await ShortAnswerQuestion.findById(questionsId);
    res.status(200).json({
      success: true,
      getOne,
      message: "Get short answer question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Get short answer question  failed",
      error: error.message,
    });
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const getAll = await ShortAnswerQuestion.find();

    res.status(200).json({
      success: true,
      getAll,
      message: "Get all short answer question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Get all short answer question failed",
      error: error.message,
    });
  }
};

const countQuestions = async (req, res) => {
  try {
    const count = await ShortAnswerQuestion.countDocuments();
    res.status(200).json({
      success: true,
      count: count,
      message: "Count short answer question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Count short answer question failed",
      error: error.message,
    });
  }
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getOneQuestion,
  getAllQuestion,
  countQuestions,
};
