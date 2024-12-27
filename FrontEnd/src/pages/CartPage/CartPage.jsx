import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseAmount, decreaseAmount, removeOrderProduct, removeOrderAllProduct, updateStock } from "../../components/redux/Slide/orderSlide";
import { formatCurrencyVND } from "../../utils";

const CartPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedItems, setUpdatedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [isEditAddressModalVisible, setIsEditAddressModalVisible] = useState(false);
  const [isBulkDeleteModalVisible, setIsBulkDeleteModalVisible] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({ name: "", address: "", phone: "" });

  useEffect(() => {
    if (user) {
      setCheckoutInfo({
        name: user.name || "",
        address: user.address || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (order?.orderItems) {
      const transformedItems = order.orderItems.map((item) => ({
        id: item.product,
        name: item.name,
        type: item.type,
        amount: item.amount,
        price: item.price,
        image: item.image,
        product: item.product,
        color: item.color,
        size: item.size,
      }));
      setUpdatedItems(transformedItems);
    }
  }, [order]);

  const total = useMemo(() => {
    return selectedItems.reduce((sum, itemId) => {
      const item = updatedItems.find(i => i.id === itemId);
      return sum + (item ? item.amount * item.price : 0);
    }, 0);
  }, [updatedItems, selectedItems]);

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === updatedItems.length
        ? []
        : updatedItems.map(item => item.id)
    );
  };

  const handleDelete = (item) => {
    setIsModalVisible(true);
    setItemToDelete(item);
  };

  const handleBulkDelete = () => {
    if (selectedItems.length > 1) {
      setIsBulkDeleteModalVisible(true);
    }
  };

  const handleConfirmBulkDelete = () => {
    dispatch(removeOrderAllProduct({ idProducts: selectedItems }));
    setSelectedItems([]);
    setIsBulkDeleteModalVisible(false);
  };

  const handleAmountChange = (id, delta) => {
    const item = updatedItems.find((item) => item.id === id);
    if (item) {
      if (delta > 0) {
        dispatch(increaseAmount({ idProduct: item.id }));
      } else if (delta < 0 && item.amount > 1) {
        dispatch(decreaseAmount({ idProduct: item.id }));
      }
    }
  };

  const handleCheckout = () => {
    if (!user.id) {
      setIsModalVisible(true);
    } else if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm");
    } else {
      setIsCheckoutModalVisible(true);
    }
  };

  if (updatedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Giỏ hàng của bạn đang trống</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Quay lại trang mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === updatedItems.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <h2 className="text-xl font-semibold text-gray-800">
                    Giỏ hàng của bạn ({updatedItems.length} sản phẩm)
                  </h2>
                </div>
                {selectedItems.length > 1 && (
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Xóa đã chọn ({selectedItems.length})
                  </button>
                )}
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {updatedItems.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <div className="mt-1 text-sm text-gray-600">
                      <p>Loại: {item.type}</p>
                      <p>Màu: {item.color}</p>
                      <p>Kích thước: {item.size}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleAmountChange(item.id, -1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-x">{item.amount}</span>
                        <button
                          onClick={() => handleAmountChange(item.id, 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleDelete(item)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-gray-800">
                      {formatCurrencyVND(item.price * item.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Tổng đơn hàng</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Số sản phẩm đã chọn</span>
                <span>{selectedItems.length}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{formatCurrencyVND(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span>Miễn phí</span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng</span>
                  <span className="text-xl font-bold text-blue-600">{formatCurrencyVND(total)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Thanh toán ({selectedItems.length} sản phẩm)
              </button>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>Địa chỉ giao hàng:</p>
                  <p className="font-medium">{checkoutInfo.address || "Chưa có địa chỉ"}</p>
                </div>
                <button
                  onClick={() => setIsEditAddressModalVisible(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Thay đổi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
            <p>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalVisible(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  dispatch(removeOrderProduct({ idProduct: itemToDelete.id }));
                  setIsModalVisible(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Modal */}
      {isBulkDeleteModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa hàng loạt</h3>
            <p>Bạn có chắc muốn xóa {selectedItems.length} sản phẩm đã chọn khỏi giỏ hàng?</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsBulkDeleteModalVisible(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-6">Thông tin thanh toán</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={checkoutInfo.name}
                  onChange={(e) => setCheckoutInfo({ ...checkoutInfo, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  value={checkoutInfo.address}
                  onChange={(e) => setCheckoutInfo({ ...checkoutInfo, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập địa chỉ"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  value={checkoutInfo.phone}
                  onChange={(e) => setCheckoutInfo({ ...checkoutInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Sản phẩm đã chọn:</span>
                  <span className="font-medium">{selectedItems.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Tổng tiền:</span>
                  <span className="font-medium text-blue-600">{formatCurrencyVND(total)}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsCheckoutModalVisible(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setIsCheckoutModalVisible(false);
                  const selectedProducts = updatedItems.filter(item => 
                    selectedItems.includes(item.id)
                  );
                  navigate("/payment", {
                    state: {
                      totalAmount: total,
                      itemsPrice: total,
                      selectedItems: selectedProducts,
                      userInfo: checkoutInfo
                    },
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {isEditAddressModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Thay đổi địa chỉ giao hàng</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ hiện tại
              </label>
              <input
                type="text"
                value={checkoutInfo.address}
                disabled
                className="w-full px-3 py-2 bg-gray-100 border rounded-lg"
              />
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Để thay đổi địa chỉ giao hàng, bạn cần cập nhật trong phần thông tin cá nhân
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsEditAddressModalVisible(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setIsEditAddressModalVisible(false);
                  navigate("/profile", { state: { activeTab: "3" } });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Đi đến cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;