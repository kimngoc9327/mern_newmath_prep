const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const check = require("validator");
const learningResourceSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LearningResources", learningResourceSchema);
