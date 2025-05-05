const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortAnswerQuestionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "short-answer-question",
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ShortAnswerQuestion",
  shortAnswerQuestionSchema
);
