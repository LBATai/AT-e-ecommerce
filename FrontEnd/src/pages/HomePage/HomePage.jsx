import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../Service/ProductService';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import Slider from '../../components/Slider/Slider';
import CardProduct from '../../components/CardProduct/CardProduct';
import Navbar from '../../components/Navbar/Navbar';
import Pending from '../../components/Pending/Pending';
import { useDebounce } from '../../hooks/useDebounce';
import ProductFilter from '../../components/ProductFilter/ProductFilter';
import { Menu, X } from 'lucide-react';
import { styles } from './style';
const Homepage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [stateProducts, setStateProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortByDate, setSortByDate] = useState(false);

  const itemsPerPage = 8;

  const fetchProductAll = async (search) => {
    try {
      const res = await ProductService.getAllProduct(search);
      return res?.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', searchDebounce, sortOrder, sortByDate],
    queryFn: () => fetchProductAll(searchDebounce),
    enabled: true,
  });



  useEffect(() => {
    if (products?.length > 0) {
      let sortedProducts = [...products];
      if (searchDebounce) {
        sortedProducts = products;
      } else if (sortByDate) {
        sortedProducts = sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        sortedProducts = sortedProducts.sort((a, b) => {
          const priceA = a.price || 0;
          const priceB = b.price || 0;
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
      }
      setStateProducts(sortedProducts);
    }
  }, [products, sortOrder, sortByDate]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = stateProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 430, behavior: 'smooth' });
  };

  const handleSortChange = (value) => {
    setSortByDate(false);
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleSortByDate = () => {
    setSortByDate(true);
    setCurrentPage(1);
    window.scrollTo({ top: 430, behavior: 'smooth' });
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Slider />
      
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 bg-white sticky top-0 z-50 shadow-sm">
        <button 
          onClick={toggleNav}
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
            onClick={toggleNav}
          />
        )}

        {/* Navbar */}
        <div
          className={`
            klcUFl
            fixed md:relative
            top-0 left-0
            h-full md:h-auto
            w-64 md:w-[20%]
            min-w-[200px]
            bg-white
            transform transition-transform duration-300 ease-in-out
            ${isNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            
            overflow-y-auto
          `}
        >
          <div className="md:hidden flex justify-end p-4">
            <button onClick={toggleNav} className="text-gray-600">
              <X size={24} />
            </button>
          </div>
          <Navbar isNavOpen={isNavOpen} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          <div className="p-5">
            <Pending isPending={isLoading}>
              <ProductFilter onSortChange={handleSortChange} onSortByDate={handleSortByDate} />
              
              {/* Product Grid */}
              <div className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentProducts.length === 0 ? (
                  <p className="text-center text-gray-500 col-span-full">Không có sản phẩm nào để hiển thị.</p>
                ) : (
                  currentProducts.map((product) => (
                    <div key={product._id} className="w-full">
                      <CardProduct
                        id={product._id}
                        {...product}
                      />
                    </div>
                  ))
                )}
              </div>
            </Pending>
          </div>

          {/* Pagination */}
          <div className="flex justify-center py-8">
            <Pagination
              current={currentPage}
              pageSize={itemsPerPage}
              total={stateProducts.length}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
