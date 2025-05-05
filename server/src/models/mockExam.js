const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const check = require("validator");

const mockExamSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    sectionMultipleChoiceQuestion: [
      {
        type: Schema.Types.ObjectId,
        ref: "MultipleChoiceQuestion",
        required: true,
      },
    ],
    sectionTrueFalseQuestion: [
      {
        type: Schema.Types.ObjectId,
        ref: "TrueFalseQuestion",
        required: true,
      },
    ],
    sectionShortAnswerQuestion: [
      {
        type: Schema.Types.ObjectId,
        ref: "ShortAnswerQuestion",
        required: true,
      },
    ],
    duration: {
      type: Number,
      default: 90,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MockExam", mockExamSchema);
