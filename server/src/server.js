const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connect = require("./config/database");
const Routes = require("./routes/index");
dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", Routes.userRoutes);
app.use("/learningResource", Routes.learningResourceRoutes);
app.use("/multipleChoiceQuestion", Routes.multipleChoiceQuestionRoutes);
app.use("/trueFalseQuestion", Routes.trueFalseQuestionRoutes);
app.use("/mockExam", Routes.mockExamRoutes);
app.use("/mockExamResult", Routes.mockExamResultRoutes);
app.use("/test", Routes.testRoutes);
app.use("/shortAnswerQuestion", Routes.shortAnswerQuestionRoutes);

app.listen(process.env.PORT, async () => {
  await connect();
  console.log(`Listening on port: ${process.env.PORT}`);
});
