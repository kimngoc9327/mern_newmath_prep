const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const check = require("validator");

const mockExamResult = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mockExam: {
    type: Schema.Types.ObjectId,
    ref: "MockExam",
    required: true,
  },
  score: {
    type: Number,
  },
  dateTaken: {
    type: Date,
  },
  studentAnswer: [
    {
      question: {
        type: Schema.Types.ObjectId,
        refPath: "studentAnswer.questionModel",
      },
      questionModel: {
        type: String,

        enum: [
          "MultipleChoiceQuestion",
          "TrueFalseQuestion",
          "ShortAnswerQuestion",
        ],
      },
      answer: {
        type: Schema.Types.Mixed,
      },
    },
  ],
});

module.exports = mongoose.model("MockExamResult", mockExamResult);
