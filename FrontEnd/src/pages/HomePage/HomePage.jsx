import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Carousel, Input, Button, Rate } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, RightOutlined } from '@ant-design/icons';
import * as ProductService from '../../Service/ProductService';
import * as VoucherService from '../../Service/VoucherService';
import * as BannerService from '../../Service/BannerService';
import { useNavigate } from 'react-router-dom';
import { Copy, CheckCircle, Save } from 'lucide-react';
import Pending from '../../components/Pending/Pending'; // Import the Pending component

const { Meta } = Card;
const { Search } = Input;

const Homepage = () => {
  const [stateProducts, setStateProducts] = useState([]);
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [savedVoucherCode, setSavedVoucherCode] = useState(null);
  const [showAllVouchers, setShowAllVouchers] = useState(false);
  const [banners, setBanners] = useState([]);

  const fetchProductAll = async () => {
    try {
      const res = await ProductService.getAllProduct();
      return res?.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  const fetchBannerAll = async () => {
    try {
      const res = await BannerService.getAllBanner();
      return res?.data || [];
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  };

  const fetchVoucherAll = async () => {
    try {
      const res = await VoucherService.getAllVoucher();
      return res?.data || [];
    } catch (error) {
      console.error('Error fetching vouchers:', error);
      return [];
    }
  };

  const { data: bannerData, isLoading: isLoadingBanner, isError: isErrorBanner } = useQuery({
    queryKey: ['banners'],
    queryFn: fetchBannerAll,
    enabled: true,
  });

  const { data: vouchersData, isLoading: isLoadingVoucher, isError: isErrorVoucher } = useQuery({
    queryKey: ['vouchers'],
    queryFn: fetchVoucherAll,
    enabled: true,
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    enabled: true,
  });


  useEffect(() => {
    if (products?.length > 0) {
      setStateProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (bannerData) {
      setBanners(bannerData);
    }
  }, [bannerData]);

  useEffect(() => {
    if (vouchersData) {
      setVouchers(vouchersData);
    }
  }, [vouchersData]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleNavigateToProduct = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleSaveVoucherCode = (code) => {
    setSavedVoucherCode(code);
    setTimeout(() => {
      setSavedVoucherCode(null);
    }, 2000);
  };
  const calculateUsagePercentage = (voucher) => {
    if (voucher.maxUsage === 0) return 100;
    const percentage = ((voucher.maxUsage - voucher.usageCount) / voucher.maxUsage) * 100;
    return percentage.toFixed(0);
  };

  const displayedVouchers = showAllVouchers ? vouchers : vouchers.slice(0, 6);

  const toggleShowAllVouchers = () => {
    setShowAllVouchers(!showAllVouchers);
  };
  // Hàm tính giá sau giảm
  const calculateDiscountedPrice = (price, discount) => {
    if (discount <= 0) return price;
    return price * (1 - discount / 100);
  };

  //Check error
  if (isErrorBanner || isErrorVoucher) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-2xl font-bold">Error Fetching data</p>
    </div>
  }

  return (
    <Pending isPending={isLoadingBanner || isLoadingVoucher || isLoadingProducts}>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Carousel */}
        <Carousel autoplay effect="fade" dots={false} arrows={true} autoplaySpeed={2500}>
          {banners?.map((item, index) => (
            <div key={index}>
              <div className="relative h-[600px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Container mới cho nội dung mờ */}
                <div className="absolute inset-0 flex items-center justify-center px-4 z-10 content-container">
                  <div className="text-white text-center">
                    <h1 className="banner-title">
                      {item.title}
                    </h1>
                    <p className="banner-description">
                      {item.description}
                    </p>
                    <Button type="primary" size="large" className="h-12 px-8">
                      Khám phá ngay <RightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Categories */}
        <div className="max-w-7xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Danh Mục Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Thời Trang Nữ', 'Thời Trang Nam', 'Phụ Kiện'].map((category, index) => (
              <div key={index} className="group cursor-pointer relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src="/api/placeholder/400/500"
                  alt={category}
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-50">
                  <h3 className="text-white text-2xl font-bold">{category}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Sản Phẩm Nổi Bật</h2>
            <Button type="link" size="large">
              Xem tất cả <RightOutlined />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Giới hạn hiển thị 8 sản phẩm đầu tiên */}
            {stateProducts.slice(0, 8).map((product) => (
              <Card
                key={product._id}
                hoverable
                cover={
                  <div className="relative h-[300px] overflow-hidden">
                    <img
                      alt={product.name}
                      src={product.images[0] || "/api/placeholder/300/300"}
                      className="w-full h-full object-cover"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                }
                actions={[
                  <HeartOutlined key="heart" />,
                  <ShoppingCartOutlined onClick={() => handleNavigateToProduct(product._id)}
                    key="cart" />
                ]}
              >
                <Meta
                  title={product.name}
                  description={
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                        </span>
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <Rate disabled defaultValue={product.rating || 4} size="small" />
                    </div>
                  }
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Vouchers Section */}
        <div className="max-w-7xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Voucher Ưu Đãi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedVouchers?.map((voucher) => (
              <div
                key={voucher._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between"
              >
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      <span className="font-bold text-blue-600">{voucher.code}</span>
                    </h3>
                    <button
                      onClick={() => handleSaveVoucherCode(voucher.code)}
                      className="text-gray-500 hover:text-blue-600 focus:outline-none"
                      title="Lưu Voucher"
                    >
                      {savedVoucherCode === voucher.code ? <CheckCircle className="h-5 w-5 text-green-500" /> : <Save className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600 font-medium mr-2">Giảm:</span>
                    <span className="text-lg font-bold text-red-600">{voucher.discount}%</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600 font-medium mr-2">HSD:</span>
                    <span className="text-gray-700">{formatDate(voucher.expiryDate)}</span>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600 font-medium mr-2">Đã dùng:</span>
                    {
                      voucher.maxUsage - voucher.usageCount > 0 ?
                        <span className="text-gray-700">{calculateUsagePercentage(voucher)}%</span>
                        :
                        <span className="text-red-600 font-bold">Hết lượt sử dụng</span>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
          {vouchers.length > 6 && (
            <div className="flex justify-center mt-4">
              <button onClick={toggleShowAllVouchers} className="text-blue-600 hover:underline">
                {showAllVouchers ? 'Ẩn bớt' : 'Xem thêm'}
              </button>
            </div>
          )}
        </div>

        {/* Newsletter */}
        <div className="bg-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Đăng Ký Nhận Thông Tin Mới Nhất
            </h2>
            <p className="text-gray-300 mb-8">
              Nhận ngay voucher 100.000đ cho đơn hàng đầu tiên khi đăng ký
            </p>
            <div className="flex max-w-md mx-auto">
              <Search
                placeholder="Nhập email của bạn"
                enterButton="Đăng ký"
                size="large"
                onSearch={value => console.log(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Pending>
  );
};

export default Homepage;