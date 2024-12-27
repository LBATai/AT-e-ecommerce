const Banner = require("../models/BannerModel");

// Tạo banner mới
const createBanner = (bannerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newBanner = await Banner.create(bannerData);
      if (newBanner) {
        resolve({
          status: "OK",
          message: "Create banner successfully",
          data: newBanner,
        });
      }
    } catch (e) {
      console.error("Error creating banner:", e.message);
      console.error("Error stack:", e.stack);
      reject(e);
    }
  });
};
// Lấy tất cả banner
const getAllBanner = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const banners = await Banner.find();
      resolve({
        status: "OK",
        message: "Get all banners successfully",
        data: banners,
      });
    } catch (error) {
      console.error("Error getting all banners:", error);
      reject(error);
    }
  });
};

// Lấy chi tiết banner
const getDetailsBanner = (bannerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const banner = await Banner.findById(bannerId);
      if (banner) {
        resolve({
          status: "OK",
          message: "Get banner details successfully",
          data: banner,
        });
      } else {
        resolve({
          status: "Error",
          message: "Banner not found",
        });
      }
    } catch (error) {
      console.error("Error getting banner details:", error);
      reject(error);
    }
  });
};

// Cập nhật banner
const updateBanner = (bannerId, bannerData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedBanner = await Banner.findByIdAndUpdate(
        bannerId,
        bannerData,
        {
          new: true,
        }
      );
      if (updatedBanner) {
        resolve({
          status: "OK",
          message: "Update banner successfully",
          data: updatedBanner,
        });
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      reject(error);
    }
  });
};
// Xóa banner
const deleteBanner = (bannerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedBanner = await Banner.findByIdAndDelete(bannerId);
      if (deletedBanner) {
        resolve({
          status: "OK",
          message: "Delete banner successfully",
          data: deletedBanner,
        });
      } else {
        resolve({
          status: "Error",
          message: "Banner not found",
        });
      }
    } catch (error) {
      console.error("Error deleting banner:", error);
      reject(error);
    }
  });
};
// Xóa nhiều banner
const deleteMultipleBanners = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deletedBanners = await Banner.deleteMany({ _id: { $in: ids } });
      if (deletedBanners) {
        resolve({
          status: "OK",
          message: "Delete multiple banners successfully",
          data: deletedBanners,
        });
      } else {
        resolve({
          status: "Error",
          message: "Banner not found",
        });
      }
    } catch (error) {
      console.error("Error deleting multiple banners:", error);
      reject(error);
    }
  });
};

module.exports = {
  createBanner,
  getAllBanner,
  getDetailsBanner,
  updateBanner,
  deleteBanner,
  deleteMultipleBanners,
};
