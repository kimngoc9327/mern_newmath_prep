const MultipleChoiceQuestion = require("../models/multipleChoiceQuestion");
const TrueFalseQuestion = require("../models/trueFalseQuestion");
const ShortAnswerQuestion = require("../models/shortAnswerQuestion");
const MockExam = require("../models/mockExam");
const puppeteer = require("puppeteer");
const path = require("path");

const createMockExam = async (req, res) => {
  try {
    const {
      title,

      multipleChoiceQuestions,
      trueFalseQuestions,
      shortAnswerQuestions,
    } = req.body;

    // Lưu trữ ObjectId cho các câu hỏi
    const multipleChoiceQuestionIds = [];
    const trueFalseQuestionIds = [];
    const shortAnswerQuestionIds = [];

    // Xử lý câu hỏi trắc nghiệm
    for (let question of multipleChoiceQuestions) {
      let questionId;
      if (question.type === "multiple-choice-question") {
        const existingQuestion = await MultipleChoiceQuestion.findOne({
          content: question.content,
        });
        if (existingQuestion) {
          questionId = existingQuestion._id;
        } else {
          const newQuestion = new MultipleChoiceQuestion({
            content: question.content,
            options: question.options,
            correctOption: question.correctOption,
            topic: question.topic,
          });
          await newQuestion.save();
          questionId = newQuestion._id;
        }
        multipleChoiceQuestionIds.push(questionId);
      }
    }

    // Xử lý câu hỏi đúng/sai
    for (let question of trueFalseQuestions) {
      let questionId;
      if (question.type === "true-false-question") {
        const existingQuestion = await TrueFalseQuestion.findOne({
          content: question.content,
        });
        if (existingQuestion) {
          questionId = existingQuestion._id;
        } else {
          const subQuestions = question.subQuestions || [];
          const newQuestion = new TrueFalseQuestion({
            content: question.content,
            subQuestions: subQuestions.map((subQ) => ({
              subContent: subQ.subContent,
              correctAnswer: subQ.correctAnswer === "true" ? "Đúng" : "Sai",
            })),
          });
          await newQuestion.save();
          questionId = newQuestion._id;
        }
        trueFalseQuestionIds.push(questionId);
      }
    }

    // Xử lý câu hỏi tự luận
    for (let question of shortAnswerQuestions) {
      let questionId;
      if (question.type === "short-answer-question") {
        const existingQuestion = await ShortAnswerQuestion.findOne({
          content: question.content,
        });
        if (existingQuestion) {
          questionId = existingQuestion._id;
        } else {
          const newQuestion = new ShortAnswerQuestion({
            content: question.content,
            answer: question.answer,
          });
          await newQuestion.save();
          questionId = newQuestion._id;
        }
        shortAnswerQuestionIds.push(questionId);
      }
    }

    // Tạo bài thi
    const mockExam = new MockExam({
      title,
      sectionMultipleChoiceQuestion: multipleChoiceQuestionIds,
      sectionTrueFalseQuestion: trueFalseQuestionIds,
      sectionShortAnswerQuestion: shortAnswerQuestionIds,
    });
    await mockExam.save();
    res.status(201).json({
      success: true,
      message: "Tạo bài thi thử thành công",
      data: mockExam,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const updateMockExam = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    duration,
    multipleChoiceQuestions,
    trueFalseQuestions,
    shortAnswerQuestions,
  } = req.body;

  try {
    const updatedMultipleChoiceQuestions = await Promise.all(
      multipleChoiceQuestions.map(async (q) => {
        const question = await MultipleChoiceQuestion.findByIdAndUpdate(
          q._id,
          q,
          { new: true }
        );
        return question;
      })
    );

    const updatedTrueFalseQuestions = await Promise.all(
      trueFalseQuestions.map(async (q) => {
        const question = await TrueFalseQuestion.findByIdAndUpdate(q._id, q, {
          new: true,
        });
        return question;
      })
    );

    const updatedShortAnswerQuestions = await Promise.all(
      shortAnswerQuestions.map(async (q) => {
        const question = await ShortAnswerQuestion.findByIdAndUpdate(q._id, q, {
          new: true,
        });
        return question;
      })
    );

    const updatedMockExam = await MockExam.findByIdAndUpdate(
      id,
      {
        title,
        duration,
        sectionMultipleChoiceQuestion: updatedMultipleChoiceQuestions.map(
          (q) => q._id
        ),
        sectionTrueFalseQuestion: updatedTrueFalseQuestions.map((q) => q._id),
        sectionShortAnswerQuestion: updatedShortAnswerQuestions.map(
          (q) => q._id
        ),
        updatedAt: Date.now(),
      },
      { new: true }
    ).populate(
      "sectionMultipleChoiceQuestion sectionTrueFalseQuestion sectionShortAnswerQuestion"
    );

    return res.status(200).json({
      success: true,
      message: "Cập nhật bài thi thử thành công",
      data: updatedMockExam,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating mock exam",
      error: error.message,
    });
  }
};

const deleteMockExam = async (req, res) => {
  try {
    const mockExamId = req.params.id;
    await MockExam.findByIdAndDelete(mockExamId);
    res.status(200).json({
      success: true,
      message: "Xóa bài thi thử thành công",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getOneMockExam = async (req, res) => {
  try {
    const mockExamId = req.params.id;
    const getOne = await MockExam.findById(mockExamId)
      .populate("sectionMultipleChoiceQuestion")
      .populate("sectionTrueFalseQuestion")
      .populate("sectionShortAnswerQuestion");
    res.status(201).json({
      success: true,
      message: "Get mock exam successfully",
      data: getOne,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllMockExam = async (req, res) => {
  try {
    const getOne = await MockExam.find()
      .populate("sectionMultipleChoiceQuestion")
      .populate("sectionTrueFalseQuestion")
      .populate("sectionShortAnswerQuestion");
    res.status(201).json({
      success: true,
      message: "Get all mock exam successfully",
      data: getOne,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getRecentMockExam = async (req, res) => {
  try {
    const recentME = await MockExam.find().sort({ createdAt: "desc" }).limit(4);
    res.json({
      success: true,
      data: recentME,
      message: "Get learning resource successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const exportMockExam = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Missing mock exam ID");
    }

    const mockExam = await MockExam.findById(id);
    if (!mockExam) {
      return res.status(404).send("Mock exam not found");
    }

    const title = mockExam.title;
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9-_]/g, "_");

    const brower = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await brower.newPage();
    page.setDefaultTimeout(60000);

    await page.goto(`http://localhost:3000/admin/exportMockExam/${id}`, {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      printBackground: true,
      format: "a4",
      margin: {
        top: "10mm",
        bottom: "20mm",
      },
    });
    await brower.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${sanitizedTitle}.pdf"`
    );

    const stream = require("stream");
    const pdfStream = new stream.Readable();
    pdfStream._read = () => {};
    pdfStream.push(pdf);
    pdfStream.push(null);
    pdfStream.pipe(res);
    res.status.json({
      success: true,
      message: "Xuất file pdf thành công",
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createMockExam,
  updateMockExam,
  deleteMockExam,
  getOneMockExam,
  getAllMockExam,
  getRecentMockExam,
  exportMockExam,
};
