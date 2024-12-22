import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router';
import * as ProductService from '../../Service/ProductService';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [type, setType] = useState([]);
  const [sex, setSex] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const starRows = [5, 4, 3, 2, 1];
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State for collapsible sections
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isGenderOpen, setGenderOpen] = useState(false);
  const [isRatingOpen, setRatingOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchType();
      await fetchSex();
    };
    fetchData();
  }, []);

  const fetchType = async () => {
    try {
      const response = await ProductService.getAllType();
      setType(response.data);
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  const fetchSex = async () => {
    try {
      const response = await ProductService.getAllSex();
      setSex(response.data);
    } catch (error) {
      console.error('Error fetching sexs:', error);
    }
  };

  const handleTypeClick = async (typeName) => {
    try {
      const products = await ProductService.getAllProduct(null, typeName, null);
      navigate(`/type/${typeName}`, { state: { products } });
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSexClick = async (sexName) => {
    try {
      const products = await ProductService.getAllProduct(null, null, sexName);
      navigate(`/sex/${sexName}`, { state: { products } });
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleApplyPriceRange = () => {
    if (priceFrom || priceTo) {
      navigate(`/price-range/${priceFrom}-${priceTo}`);
      setIsMobileMenuOpen(false);
    }
  };

  const getSexLabel = (sexOption) => {
    switch (sexOption) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      case 'unisex':
        return 'Unisex';
      default:
        return '';
    }
  };

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
            className={`transform transition-transform duration-300 ${
              isCategoryOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isCategoryOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          {type.map((typeItem, index) => (
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
            className={`transform transition-transform duration-300 ${
              isGenderOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isGenderOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          {sex.map((sexOption, index) => (
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
            className={`transform transition-transform duration-300 ${
              isRatingOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isRatingOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          {starRows.map((goldStarCount, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 py-2 cursor-pointer">
              {[...Array(5)].map((_, starIndex) => (
                <span
                  key={starIndex}
                  className="text-2xl"
                  style={{
                    color: '#FFD700'
                  }}
                >
                  {starIndex < goldStarCount ? '★' : '☆'}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Navbar Content */}
      <div
        className={`md:block ${
          isMobileMenuOpen
            ? 'fixed right-0 top-0 h-full w-80 z-50 overflow-y-auto'
            : 'hidden'
        } md:relative md:w-auto md:h-auto`}
      >
        <div className="mb-5 ml-5 bg-white p-4 border border-gray-300 rounded-lg h-full">
          <NavbarContent />
        </div>
      </div>
    </>
  );
};

export default Navbar;