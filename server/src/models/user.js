const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const check = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      message: "Username must be at least 2 characters",
    },

    email: {
      type: String,
      required: true,
      validate: {
        validator: function (email) {
          return check.isEmail(email);
        },
        message: "Email is incorrect format",
      },
    },
    avatar: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      message: "Password must be at least 8 characters",
    },
    admin: { type: Boolean, default: false },
    mockExamResults: [
      {
        type: Schema.Types.ObjectId,
        ref: "MockExamResult",
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
