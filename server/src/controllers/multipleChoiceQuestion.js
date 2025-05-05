const MultipleChoiceQuestion = require("../models/multipleChoiceQuestion");

const createQuestion = async (req, res) => {
  const { content, options, type, correctOption } = req.body;

  try {
    const newQuestion = new MultipleChoiceQuestion({
      content,
      options,
      type,
      correctOption,
    });
    await newQuestion.save();
    res.status(200).json({
      success: true,
      newQuestion,
      message: "Tạo câu hỏi thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Create multiple choice failed",
      error: error.message,
    });
  }
};

const updateQuestion = async (req, res) => {
  const questionsId = req.params.id;
  const { content, options, topic, type, correctOption } = req.body;
  try {
    const data = { content, options, topic, type, correctOption };
    const update = await MultipleChoiceQuestion.findByIdAndUpdate(
      questionsId,
      data,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: data,
      update: update,
      message: "Cập nhật câu hỏi thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Update multiple choice question  failed",
      error: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  const questionsId = req.params.id;
  try {
    await MultipleChoiceQuestion.findByIdAndDelete(questionsId);
    res.status(200).json({
      success: true,
      message: "Xóa câu hỏi thành công",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Delete multiple choice question  failed",
      error: error.message,
    });
  }
};

const getOneQuestion = async (req, res) => {
  const condition = req.params.id;
  try {
    const getOne = await MultipleChoiceQuestion.findById(condition);
    res.status(200).json({
      success: true,
      data: getOne,
      message: "Get multiple choice question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Get multiple choice question  failed",
      error: error.message,
    });
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const getAll = await MultipleChoiceQuestion.find();

    res.status(200).json({
      success: true,
      data: getAll,
      message: "Get all multiple choice question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Get all multiple choice question failed",
      error: error.message,
    });
  }
};

const countQuestions = async (req, res) => {
  try {
    const count = await MultipleChoiceQuestion.countDocuments();
    res.status(200).json({
      success: true,
      count: count,
      message: "Count multiple choice question successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Count multiple choice question failed",
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
