const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");

const createUser = async (req, res) => {
  try {
    // console.log(req.body)
    const { name, email, password, phone, address, age, avatar } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!name || !email || !password || !phone) {
      return res.status(200).json({
        status: "Error",
        message: "Please provide all required fields",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Error",
        message: "The input is email",
      });
    }
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    // console.log(req.body)
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "Error",
        message: "Please provide all required fields",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Error",
        message: "The input is email",
      });
    }
    // console.log('isCheckEmail', isCheckEmail)
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Chỉ bật secure nếu là production (HTTPS)
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
    // console.log('respone', respone)
    return res.status(200).json(newResponse);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const signOutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "Ok",
      message: "Sign out successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "The userId is required",
      });
    }
    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "Error",
        message: "The userId is required",
      });
    }
    const response = await UserService.deleteUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "Req is id",
      });
    }
    const response = await UserService.getDetailsUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error Details:", {
      name: e.name,
      message: e.message,
      stack: e.stack,
    });
  }
};

const refreshToken = async (req, res) => {
  // console.log('req.cookies.refresh_token:', req.cookies.refresh_token)

  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERROR",
        message: "The token is required",
      });
    }
    const response = await JwtService.refreshTokenJwtService(token);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error Details:", {
      name: e.name,
      message: e.message,
      stack: e.stack,
    });
  }
};

const deleteMultipleUser = async (req, res) => {
  try {
    const userIds = req.body.ids; // Lấy danh sách ID từ body
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(200).json({
        status: "Error",
        message: "Danh sách userIds là bắt buộc và phải là một mảng hợp lệ.",
      });
    }

    const response = await UserService.deleteMultipleUser(userIds); // Đổi tên gọi service
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshToken,
  signOutUser,
  deleteMultipleUser,
};
