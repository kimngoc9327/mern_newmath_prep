const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trueFalseQuestionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "true-false-question",
    },
    subQuestions: [
      {
        subContent: {
          type: String,
          required: true,
        },
        correctAnswer: {
          type: String,
          enum: ["Đúng", "Sai"],
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TrueFalseQuestion", trueFalseQuestionSchema);
