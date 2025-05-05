const MultipleChoiceQuestion = require("../models/multipleChoiceQuestion"); // Import model câu hỏi
const Test = require("../models/test");

const createTest = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const multipleChoiceQuestions = [];
    for (let question of questions) {
      const existingQuestion = await MultipleChoiceQuestion.findOne({
        content: question.content,
      });
      if (existingQuestion) {
        multipleChoiceQuestions.push(existingQuestion._id);
      } else {
        const newQuestion = new MultipleChoiceQuestion({
          content: question.content,
          options: question.options,
          correctOption: question.correctOption,
        });
        await newQuestion.save();
        multipleChoiceQuestions.push(newQuestion._id);
      }
    }

    const test = new Test({
      title,
      questions: multipleChoiceQuestions,
    });
    await test.save();
    res.status(201).json({
      success: true,
      message: "Tạo bài kiểm tra thành công",
      data: test,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const updateTest = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  try {
    const test = await Test.findById(id);
    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Bài kiểm tra không tồn tại",
      });
    }

    const updatedQuestions = await Promise.all(
      questions.map(async (q) => {
        const question = await MultipleChoiceQuestion.findByIdAndUpdate(
          q._id,
          q,
          { new: true }
        );
        return question;
      })
    );

    const updatedTest = await MockExam.findByIdAndUpdate(
      id,
      {
        title,
        questions: updatedQuestions.map((q) => q._id),

        updatedAt: Date.now(),
      },
      { new: true }
    ).populate("questions");

    res.status(200).json({
      success: true,
      message: "Cập nhật bài kiểm tra thành công",
      data: updatedTest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi cập nhật bài kiểm tra",
      error: error.message,
    });
  }
};

const getAllTest = async (req, res) => {
  try {
    const getAll = await Test.find();
    res.status(200).json({
      success: true,
      data: getAll,
      message: "Get learning resource successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getOneTest = async (req, res) => {
  const testId = req.params.id;
  try {
    const getOne = await Test.findById(testId).populate("questions");
    res.status(200).json({
      success: true,
      data: getOne,
      message: "Get learning resource successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteTest = async (req, res) => {
  const testId = req.params.id;

  try {
    const deleteTest = await Test.findByIdAndDelete(testId);
    if (!testId) {
      return res.status(401).json({
        success: false,
        message: "Id not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa bài kiểm tra thành công",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getRecentTest = async (req, res) => {
  try {
    const recentTest = await Test.find().sort({ createdAt: "desc" }).limit(4);
    res.json({
      success: true,
      data: recentTest,
      message: "Get learning resource successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  createTest,
  getAllTest,
  getOneTest,
  deleteTest,
  updateTest,
  getRecentTest,
};
