import React, { useState, useEffect } from 'react';
import { Pagination, Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../Service/ProductService';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import Slider from '../../components/Slider/Slider';
import CardProduct from '../../components/CardProduct/CardProduct';
import Navbar from '../../components/Navbar/Navbar';
import { WrapperHome, CardContainer, PaginationContainer, NavbarContainer, TypeStyle } from './style';
import Pending from '../../components/Pending/Pending';
import { useDebounce } from '../../hooks/useDebounce';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import { useParams } from 'react-router-dom';

const PriceProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const { price } = useParams(); // Lấy giá trị price từ URL, ví dụ: '100000-200000'
  const [stateProducts, setStateProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // State lưu trữ sắp xếp
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortByDate, setSortByDate] = useState(false);

  // Hàm gọi API để lấy danh sách sản phẩm
  const fetchProductAll = async (search, type, sex, priceFrom, priceTo) => {
    try {
      const res = await ProductService.getAllProduct(search, type, sex, priceFrom, priceTo);
      return res?.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  // Lọc khoảng giá từ giá trị 'price' trong URL
  const [priceFrom, priceTo] = price ? price.split('-').map(Number) : [null, null];

  // Sử dụng useQuery để gọi API và lấy danh sách sản phẩm
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', searchDebounce, sortOrder, sortByDate, price],
    queryFn: () => fetchProductAll(searchDebounce, null, null, priceFrom, priceTo),
    enabled: !!price, // Chỉ kích hoạt query khi khoảng giá có giá trị
  });

  // Lọc và sắp xếp sản phẩm khi có thay đổi
  useEffect(() => {
    if (products?.length > 0) {
      let sortedProducts = [...products];

      // Sắp xếp theo ngày tạo nếu chọn "Mới nhất"
      if (sortByDate) {
        sortedProducts = sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        // Sắp xếp theo giá
        sortedProducts = sortedProducts.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
      }

      setStateProducts(sortedProducts);
    }
  }, [products, sortOrder, sortByDate]);

  // Tính toán start và end index cho phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = stateProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Cập nhật lại thứ tự sắp xếp khi người dùng chọn
  const handleSortChange = (value) => {
    setSortByDate(false); // Nếu người dùng chọn sắp xếp theo giá, tắt sắp xếp theo ngày
    setSortOrder(value);
    setCurrentPage(1); // Đặt lại trang về 1 khi thay đổi sắp xếp
  };

  const handleSortByDate = () => {
    setSortByDate(true); // Sắp xếp theo ngày tạo
    setCurrentPage(1); // Đặt lại trang về 1 khi thay đổi sắp xếp
  };

  return (
    <>
      <TypeProduct />
      <Slider />
      <WrapperHome>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
        <div style={{ flex: 1, padding: '20px' }}>
          <Pending isPending={isLoading}>
            <ProductFilter onSortChange={handleSortChange} onSortByDate={handleSortByDate} />
            <TypeStyle>
              Khoảng giá: {priceFrom && priceTo ? `${priceFrom}đ - ${priceTo}đ` : 'Tất cả sản phẩm'}
            </TypeStyle>
            <CardContainer>
              {currentProducts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999' }}>Không có sản phẩm nào trong khoảng giá này.</p>
              ) : (
                currentProducts.map((product, index) => (
                  <CardProduct
                    key={product._id}
                    id={product._id}
                    {...product}
                  />
                ))
              )}
            </CardContainer>
          </Pending>
        </div>
      </WrapperHome>
      <PaginationContainer>
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={stateProducts.length}
          onChange={handlePageChange}
        />
      </PaginationContainer>
      <br />
    </>
  );
};

export default PriceProductPage;
