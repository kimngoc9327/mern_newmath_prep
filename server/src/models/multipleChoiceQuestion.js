const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const multipleChoiceQuestionSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],

    type: {
      type: String,
      default: "multiple-choice-question",
    },
    correctOption: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "MultipleChoiceQuestion",
  multipleChoiceQuestionSchema
);
