const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const check = require("validator");

const Test = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "MultipleChoiceQuestion",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tests", Test);
