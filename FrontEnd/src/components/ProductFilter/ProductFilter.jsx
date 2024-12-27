import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProduct } from '../redux/Slide/productSlide.js';
import { ChevronDown, Filter } from 'lucide-react';

const ProductFilter = ({ onSortChange, onSortByDate, onSortBySelled, onSortByDiscount }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSortChange = (value) => {
    onSortChange(value);
    window.scrollTo({ top: 430, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortBySelled = () => {
    onSortBySelled();
    setIsDropdownOpen(false);
  }
  const handleSortByDiscount = () => {
    onSortByDiscount();
    setIsDropdownOpen(false);
  }

  return (
    <div className="w-full p-4 bg-white shadow-sm rounded-lg">
      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Nhập tên sản phẩm để tìm kiếm ..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Dropdown Button */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span>Bộ lọc</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 space-y-4">
                {/* Sort Options */}
                <select
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleSortChange(e.target.value)}
                  defaultValue="asc"
                >
                  <option value="asc">Giá: Tăng dần</option>
                  <option value="desc">Giá: Giảm dần</option>
                </select>

                {/* Filter Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={handleSortBySelled}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span role="img" aria-label="best-seller" className="text-lg">🏆</span>
                    <span>Bán chạy</span>
                  </button>
                  <button
                    onClick={onSortByDate}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span role="img" aria-label="newest" className="text-lg">🆕</span>
                    <span>Mới nhất</span>
                  </button>
                  <button
                    onClick={handleSortByDiscount}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <span role="img" aria-label="discount" className="text-lg">🔥</span>
                    <span>Giảm giá</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex md:items-center md:justify-between gap-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            className="w-40 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
            onChange={(e) => handleSortChange(e.target.value)}
            defaultValue="asc"
          >
            <option value="asc">Giá: Tăng dần</option>
            <option value="desc">Giá: Giảm dần</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSortBySelled}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <span role="img" aria-label="best-seller" className="text-lg">🏆</span>
            <span>Bán chạy</span>
          </button>
          <button
            onClick={onSortByDate}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <span role="img" aria-label="newest" className="text-lg">🆕</span>
            <span>Mới nhất</span>
          </button>
          <button
            onClick={handleSortByDiscount}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
          >
            <span role="img" aria-label="discount" className="text-lg">🔥</span>
            <span>Giảm giá</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Nhập tên sản phẩm để tìm kiếm ..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;