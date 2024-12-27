const BannerService = require("../services/BannerService");

// Tạo banner mới
const createBanner = async (req, res) => {
  try {
    const { image, title, description } = req.body;
    if (!image) {
      return res.status(200).json({
        status: "Error",
        message: "Please provide all required fields of the banner",
      });
    }
    const response = await BannerService.createBanner(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error creating banner:", e);
    return res.status(500).json({
      message: e.message,
    });
  }
};
// Lấy tất cả banner
const getAllBanner = async (req, res) => {
  try {
    const response = await BannerService.getAllBanner();
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error get all banner:", e);
    return res.status(500).json({
      message: "Error occurred while fetching banner",
    });
  }
};
// Lấy chi tiết banner
const getDetailsBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    if (!bannerId) {
      return res.status(200).json({
        status: "Error",
        message: "The bannerId is required",
      });
    }
    const response = await BannerService.getDetailsBanner(bannerId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error get details banner:", e);
    return res.status(500).json({
      message: "Error occurred while fetching banner details",
    });
  }
};

// Cập nhật banner
const updateBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    if (!bannerId) {
      return res.status(200).json({
        status: "Error",
        message: "The bannerId is required",
      });
    }
    const response = await BannerService.updateBanner(bannerId, req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error updating banner:", e);
    return res.status(500).json({
      message: "Error occurred while updating banner",
    });
  }
};
// Xóa banner
const deleteBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    if (!bannerId) {
      return res.status(200).json({
        status: "Error",
        message: "The bannerId is required",
      });
    }
    const response = await BannerService.deleteBanner(bannerId);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error deleting banner:", e);
    return res.status(500).json({
      message: "Error occurred while deleting banner",
    });
  }
};

// Xóa nhiều banner
const deleteMultipleBanners = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids) {
      return res.status(200).json({
        status: "Error",
        message: "Please provide ids of the banner",
      });
    }
    const response = await BannerService.deleteMultipleBanners(ids);
    return res.status(200).json(response);
  } catch (e) {
    console.error("Error deleting multiple banners:", e);
    return res.status(500).json({
      message: "Error occurred while deleting multiple banners",
    });
  }
};

module.exports = {
  createBanner,
  getAllBanner,
  getDetailsBanner,
  updateBanner,
  deleteBanner,
  deleteMultipleBanners,
};
