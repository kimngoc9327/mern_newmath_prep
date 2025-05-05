const TrueFalseQuestion = require("../models/trueFalseQuestion");

const createQuestion = async (req, res) => {
  const { content, subQuestions } = req.body;

  try {
    const newQuestion = new TrueFalseQuestion({
      content,
      subQuestions,
    });
    await newQuestion.save();
    res.status(200).json({
      success: true,
      newQuestion,
      message: "Create true false question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Create true false failed",
      error: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  const questionsId = req.params.id;
  const { content, subQuestions } = req.body;
  try {
    const data = { content, subQuestions };
    const update = await TrueFalseQuestion.findByIdAndUpdate(
      questionsId,
      data,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: data,
      update: update,
      message: "Update true false question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Update true false question  failed",
      error: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  const questionsId = req.params.id;
  try {
    const deleteQuestion = await TrueFalseQuestion.findByIdAndDelete(
      questionsId
    );
    res.status(200).json({
      success: true,
      message: "Delete true false question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Delete true false question  failed",
      error: error.message,
    });
  }
};

const getOneQuestion = async (req, res) => {
  const questionsId = req.params.id;
  try {
    const getOne = await TrueFalseQuestion.findById(questionsId);
    res.status(200).json({
      success: true,
      getOne,
      message: "Get true false question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Get true false question  failed",
      error: error.message,
    });
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const getAll = await TrueFalseQuestion.find();

    res.status(200).json({
      success: true,
      getAll,
      message: "Get all true false question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Get all true false question failed",
      error: error.message,
    });
  }
};

const countQuestions = async (req, res) => {
  try {
    const count = await TrueFalseQuestion.countDocuments();
    res.status(200).json({
      success: true,
      count: count,
      message: "Count true false question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Counttrue false question failed",
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
