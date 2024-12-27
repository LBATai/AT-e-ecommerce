import React, { useState, useEffect } from 'react';
import { Pagination, Input, Button, Breadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import * as ProductService from '../../Service/ProductService';
import Slider from '../../components/Slider/Slider';
import CardProduct from '../../components/CardProduct/CardProduct';
import { WrapperHome, CardContainer, PaginationContainer, NavbarContainer, TypeStyle } from './style';
import Pending from '../../components/Pending/Pending';
import { useDebounce } from '../../hooks/useDebounce';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import { Menu, X, ChevronDown } from 'lucide-react';


const TypeProductPage = () => {
  const navigate = useNavigate();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const { type } = useParams();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [stateProducts, setStateProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortByDate, setSortByDate] = useState(false);
  const [sortBySelled, setSortBySelled] = useState(false);
  const [sortByDiscount, setSortByDiscount] = useState(false);

  // Navbar states
  const [allType, setAllType] = useState([]);
  const [allSex, setAllSex] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isGenderOpen, setGenderOpen] = useState(false);
  const [isRatingOpen, setRatingOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);

  const itemsPerPage = 8;
  const starRows = [5, 4, 3, 2, 1];

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeResponse = await ProductService.getAllType();
        const sexResponse = await ProductService.getAllSex();
        setAllType(typeResponse.data);
        setAllSex(sexResponse.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchData();
  }, []);


  const fetchProductAll = async (search, type, sex) => {
    try {
      const res = await ProductService.getAllProduct(search, type, sex);
      return res?.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };


  const { data: products, isLoading } = useQuery({
    queryKey: ['products', searchDebounce, sortOrder, sortByDate, sortBySelled, sortByDiscount, type],
    queryFn: () => fetchProductAll(searchDebounce, type),
    enabled: true,
  });


  useEffect(() => {
    if (products?.length > 0) {
      let sortedProducts = [...products];
      if (searchDebounce) {
        sortedProducts = products;
      } else if (sortByDate) {
        sortedProducts = sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortBySelled) {
        sortedProducts = sortedProducts.sort((a, b) => (b.selled || 0) - (a.selled || 0));
      } else if (sortByDiscount) {
        sortedProducts = sortedProducts
          .filter(product => product.discount > 0)
          .sort((a, b) => (b.discount || 0) - (a.discount || 0));
      }
      else {
        sortedProducts = sortedProducts.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
      }
      if (selectedRating) {
        sortedProducts = sortedProducts.filter(
          (product) => product.rating >= selectedRating && product.rating < selectedRating + 1
        );
      }
      setStateProducts(sortedProducts);
    }
  }, [products, sortOrder, sortByDate, searchDebounce, sortBySelled, sortByDiscount, selectedRating]);


  const handleTypeClick = async (typeName) => {
    try {
      const products = await ProductService.getAllProduct(null, typeName, null);
      navigate(`/type/${typeName}`, { state: { products } });
      setIsNavOpen(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleSexClick = async (sexName) => {
    try {
      const products = await ProductService.getAllProduct(null, null, sexName);
      navigate(`/sex/${sexName}`, { state: { products } });
      setIsNavOpen(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleApplyPriceRange = () => {
    if (priceFrom || priceTo) {
      navigate(`/price-range/${priceFrom}-${priceTo}`);
      setIsNavOpen(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 430, behavior: 'smooth' });
  };
  const handleSortChange = (value) => {
    setSortByDate(false);
    setSortBySelled(false);
    setSortByDiscount(false)
    setSortOrder(value);
    setCurrentPage(1);
  };
  const handleSortByDate = () => {
    setSortBySelled(false);
    setSortByDiscount(false)
    setSortByDate(true);
    setCurrentPage(1);
    window.scrollTo({ top: 430, behavior: 'smooth' });
  };
  const handleSortBySelled = () => {
    setSortByDate(false);
    setSortByDiscount(false);
    setSortBySelled(true);
    setCurrentPage(1);
    window.scrollTo({ top: 430, behavior: 'smooth' });
  };
  const handleSortByDiscount = () => {
    setSortByDate(false);
    setSortBySelled(false);
    setSortByDiscount(true)
    setCurrentPage(1);
    window.scrollTo({ top: 430, behavior: 'smooth' });
  }
  const getSexLabel = (sexOption) => {
    switch (sexOption) {
      case 'male': return 'Nam';
      case 'female': return 'Nữ';
      case 'unisex': return 'Unisex';
      default: return '';
    }
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setIsRatingOpen(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = stateProducts.slice(startIndex, endIndex);


  const NavbarContent = () => (
    <div className="space-y-4">
      {/* Price Range Section */}
      <div>
        <div className="text-lg mb-3">Khoảng giá</div>
        <div className="flex items-center space-x-4">
          <Input
            placeholder="đ Từ"
            className="w-24"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <span>-</span>
          <Input
            placeholder="đ Đến"
            className="w-24"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
          />
        </div>
        <Button
          type="primary"
          className="mt-3 w-full"
          onClick={handleApplyPriceRange}
        >
          Áp dụng
        </Button>
      </div>

      <hr className="border-gray-200" />

      {/* Categories Section */}
      <div>
        <button
          onClick={() => setCategoryOpen(!isCategoryOpen)}
          className="flex items-center justify-between w-full text-lg py-2"
        >
          <span>Danh mục</span>
          <ChevronDown
            className={`transform transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''
              }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isCategoryOpen ? 'max-h-96' : 'max-h-0'
            }`}
        >
          {allType.map((typeItem, index) => (
            <div
              key={index}
              onClick={() => handleTypeClick(typeItem)}
              className="ml-2 cursor-pointer py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {typeItem}
            </div>
          ))}
        </div>
      </div>

      {/* Gender Section */}
      <div>
        <button
          onClick={() => setGenderOpen(!isGenderOpen)}
          className="flex items-center justify-between w-full text-lg py-2"
        >
          <span>Giới tính</span>
          <ChevronDown
            className={`transform transition-transform duration-300 ${isGenderOpen ? 'rotate-180' : ''
              }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isGenderOpen ? 'max-h-96' : 'max-h-0'
            }`}
        >
          {allSex.map((sexOption, index) => (
            <div
              key={index}
              onClick={() => handleSexClick(sexOption)}
              className="ml-2 cursor-pointer py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              {getSexLabel(sexOption)}
            </div>
          ))}
        </div>
      </div>

      {/* Rating Section */}
      <div>
        <button
          onClick={() => setRatingOpen(!isRatingOpen)}
          className="flex items-center justify-between w-full text-lg py-2"
        >
          <span>Đánh giá</span>
          <ChevronDown
            className={`transform transition-transform duration-300 ${isRatingOpen ? 'rotate-180' : ''
              }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isRatingOpen ? 'max-h-96' : 'max-h-0'
            }`}
        >
          {starRows.map((goldStarCount, rowIndex) => (
            <div key={rowIndex} className="flex justify-between items-center py-2 ">
              <span className="mr-1 text-xl">
                {[...Array(goldStarCount)].map((_, index) => (
                  <span key={index} style={{ color: '#FFD700', fontSize: '1.5rem' }}>★</span>
                ))}
              </span>
              <span
                onClick={() => handleRatingClick(goldStarCount)}
                className="text-lg cursor-pointer"
              >{goldStarCount} sao
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-100">
      <Slider />

      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-white sticky top-0 z-50 shadow-sm">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex items-center space-x-2 text-gray-600"
        >
          <Menu size={24} />
          <span>Menu</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Overlay for mobile nav */}
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsNavOpen(false)}
          />
        )}

        {/* Navbar */}
        <div
          className={`
            fixed md:relative
            top-0 left-0
            h-full md:h-auto
            w-64 md:w-[20%]
            min-w-[200px]
            bg-white
            transform transition-transform duration-300 ease-in-out
            ${isNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            z-50 md:z-auto
            overflow-y-auto
          `}
        >
          <div className="md:hidden flex justify-end p-4">
            <button onClick={() => setIsNavOpen(false)} className="text-gray-600">
              <X size={24} />
            </button>
          </div>
          <div className="mb-5 ml-5 bg-white p-4 border border-gray-300 rounded-lg h-full">
            <NavbarContent />
          </div>
        </div>
        {/* Main Content Area */}
        <div className="flex-1">
          <div className="p-5">
            <Pending isPending={isLoading}>
              <ProductFilter
                onSortChange={handleSortChange}
                onSortByDate={handleSortByDate}
                onSortBySelled={handleSortBySelled}
                onSortByDiscount={handleSortByDiscount}
              />
              <TypeStyle>
                Loại sản phẩm: {type ? `${type}` : 'Tất cả sản phẩm'}
              </TypeStyle>
              <CardContainer>
                {currentProducts.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#999' }}>Không có sản phẩm nào để hiển thị.</p>
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
          {/* Pagination */}
          <div className="flex justify-center py-8">
            {stateProducts.length > 0 && (
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={stateProducts.length}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeProductPage;