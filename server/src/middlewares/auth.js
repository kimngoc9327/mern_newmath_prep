const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jsonwebtoken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(jsonwebtoken.userId);
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or missing token",
    });
  }
};

const checkAdmin = (req, res, next) => {
  if (!req.user?.admin) {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin only.",
    });
  }
  next();
};

module.exports = { verifyToken, checkAdmin };
