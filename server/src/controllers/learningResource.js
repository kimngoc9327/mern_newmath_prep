const LearningResource = require("../models/learningResource");

const createLearningResource = async (req, res) => {
  const { title, content } = req.body;
  try {
    const existingLearningResource = await LearningResource.findOne({ title });

    if (existingLearningResource) {
      return res.status(400).json({
        success: false,
        error: "Tên tài liệu đã tồn tại",
      });
    }

    const newLearningResource = new LearningResource({
      title,
      content,
    });

    await newLearningResource.save();
    res.status(200).json({
      success: true,
      data: newLearningResource,
      message: "Tạo tài liệu ôn tập thành công",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const updateLearningResource = async (req, res) => {
  const learningResourceId = req.params.id;
  const { title, content } = req.body;
  try {
    const data = { title, content };
    const update = await LearningResource.findByIdAndUpdate(
      learningResourceId,
      data,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: data,
      update: update,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteLearningResource = async (req, res) => {
  const learningResourceId = req.params.id;
  try {
    const deleteLearningResource = await LearningResource.findByIdAndDelete(
      learningResourceId
    );
    if (!learningResourceId) {
      return res.status(401).json({
        success: false,
        message: "Không tìm thấy tài liệu",
      });
    }
    res.status(200).json({
      success: true,
      message: "Xóa thành công",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getOneLearningResource = async (req, res) => {
  const learningResourceId = req.params.id;
  try {
    const getOne = await LearningResource.findById(learningResourceId);
    res.status(200).json({
      success: true,
      data: getOne,
      message: "Get learning resource successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getAllLearningResource = async (req, res) => {
  try {
    const getAll = await LearningResource.find();
    res.status(200).json({
      success: true,
      data: getAll,
      message: "Get learning resource successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

const getRecentLearningResource = async (req, res) => {
  try {
    const recentLR = await LearningResource.find()
      .sort({ createdAt: "desc" })
      .limit(4);
    res.json({
      success: true,
      data: recentLR,
      message: "Get learning resource successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createLearningResource,
  updateLearningResource,
  deleteLearningResource,
  getOneLearningResource,
  getAllLearningResource,
  getRecentLearningResource,
};
