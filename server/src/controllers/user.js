const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(403).json({
        success: false,
        error: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
      data: newUser,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Create user failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res
        .status(403)
        .json({ success: false, error: "Sai email hoặc mật khẩu" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userId = user._id;
        const name = user.name;
        const admin = user.admin;
        const accessToken = jwt.sign({ userId, admin }, process.env.JWT_SECRET);
        res.status(200).json({
          success: true,
          message: "Đăng nhập thành công",
          name,
          userId,
          accessToken,
          admin,
        });
      } else {
        res
          .status(403)
          .json({ success: false, error: "Sai email hoặc mật khẩu" });
      }
    }
  } catch (error) {
    res.status(403).json({ success: false, error: "Sai email hoặc mật khẩu" });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { name, email, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    console.log(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (email && email === user.email) {
      return res.status(200).json({
        success: false,
        error: "Email không thay đổi",
      });
    } else if (email && email !== user.email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          error: "Email đã tồn tại",
        });
      }
      user.email = email;
    }

    if (newPassword && newPassword === currentPassword) {
      return res.status(400).json({
        success: false,
        error: "Mật khẩu không thay đổi",
      });
    } else if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          error: "Sai mật khẩu hiện tại",
        });
      }

      const hashedNewPassword = await bcrypt.hash(
        newPassword,
        parseInt(process.env.SALT_ROUNDS)
      );
      user.password = hashedNewPassword;
    }

    if (name && name === user.name) {
      return res.status(400).json({
        success: false,
        error: "Tên không thay đổi",
      });
    } else if (name) {
      user.name = name;
    }
    if (req.file) user.avatar = req.file.filename;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật tài khoản thành công",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("mockExamResults");
    res.status(200).json({
      success: true,
      message: "Get user successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = { register, login, updateProfile, getUser };
