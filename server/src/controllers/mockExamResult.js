const MockExam = require("../models/mockExam");
const MockExamResult = require("../models/mockExamResult");
const MultipleChoiceQuestion = require("../models/multipleChoiceQuestion");
const TrueFalseQuestion = require("../models/trueFalseQuestion");
const ShortAnswerQuestion = require("../models/shortAnswerQuestion");
const User = require("../models/user");

const createMockExamResult = async (req, res) => {
  try {
    const mockExamId = req.params.id;
    const student = req.user._id;
    const { studentAnswer } = req.body;
    let totalScore = 0;

    const mockExam = await MockExam.findById(mockExamId)
      .populate("sectionMultipleChoiceQuestion")
      .populate("sectionTrueFalseQuestion")
      .populate("sectionShortAnswerQuestion");

    if (!mockExam) {
      return res.status(200).json({
        success: false,
        message: "Mock exam not found",
      });
    }

    for (const answer of studentAnswer) {
      const { question, questionModel, answer: studentResponse } = answer;

      if (questionModel === "MultipleChoiceQuestion") {
        const multipleChoiceQuestion = await MultipleChoiceQuestion.findById(
          question
        );
        if (
          multipleChoiceQuestion &&
          multipleChoiceQuestion.correctOption === studentResponse
        ) {
          totalScore += 0.25;
        }
      } else if (questionModel === "TrueFalseQuestion") {
        const trueFalseQuestion = await TrueFalseQuestion.findById(question);

        if (trueFalseQuestion) {
          let correctCount = 0;

          for (const subAnswer of studentResponse) {
            const { subQuestionId, studentAnswer } = subAnswer;
            const subQuestion =
              trueFalseQuestion.subQuestions.id(subQuestionId);
            if (subQuestion && subQuestion.correctAnswer === studentAnswer) {
              correctCount++;
            }
          }

          if (correctCount === 1) {
            totalScore += 0.1;
          } else if (correctCount === 2) {
            totalScore += 0.25;
          } else if (correctCount === 3) {
            totalScore += 0.5;
          } else if (correctCount === 4) {
            totalScore += 1;
          }
        }
      } else if (questionModel === "ShortAnswerQuestion") {
        const shortAnswerQuestion = await ShortAnswerQuestion.findById(
          question
        );
        if (
          shortAnswerQuestion &&
          shortAnswerQuestion.answer === studentResponse
        ) {
          totalScore += 0.5;
        }
      }
    }

    const newMockExamResult = new MockExamResult({
      student,
      mockExam,
      score: totalScore,
      dateTaken: new Date(),
      studentAnswer,
    });
    await newMockExamResult.save();

    await User.findByIdAndUpdate(student, {
      $push: { mockExamResults: newMockExamResult._id },
    });

    res.status(200).json({
      success: true,
      message: "Create mock exam result successfully",
      data: newMockExamResult,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getMockExamResult = async (req, res) => {
  try {
    const id = req.params.id;
    const mockExamResult = await MockExamResult.findById(id).populate(
      "mockExam"
    );

    res.status(201).json({
      success: true,
      message: "Get mock exam result successfully",
      data: mockExamResult,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { createMockExamResult, getMockExamResult };
