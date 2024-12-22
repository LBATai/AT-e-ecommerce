import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CardProduct = (props) => {
  const navigate = useNavigate();
  const { description, images, name, price, rating, discount, id, type } = props;
  const [isHovered, setIsHovered] = useState(false);
  const similarProduct = useRef(null);
  const viewDetailsRef = useRef(null);
  const discountedPrice = price - (price * discount) / 100;

  const formatCurrencyVND = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const resetButtonPosition = () => {
    if (similarProduct.current) similarProduct.current.style.transform = 'translateX(100%)';
    if (viewDetailsRef.current) viewDetailsRef.current.style.transform = 'translateX(100%)';
  };

  const animateButton = (button, direction) => {
    let position = direction === 'in' ? 100 : 0;
    const step = direction === 'in' ? -5 : 5;

    const animate = () => {
      position += step;
      button.style.transform = `translateX(${position}%)`;

      if ((direction === 'in' && position > 0) || (direction === 'out' && position < 100)) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    if (isHovered) {
      animateButton(similarProduct.current, 'in');
      animateButton(viewDetailsRef.current, 'in');
    } else {
      animateButton(similarProduct.current, 'out');
      animateButton(viewDetailsRef.current, 'out');
    }
  }, [isHovered]);

  return (
    <div 
      className="w-[220px] h-[400px] relative overflow-hidden border border-gray-300 flex flex-col transition-all hover:border-gray-600 hover:shadow-inner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetButtonPosition();
      }}
    >
      <div className="h-full flex flex-col">
        <div className="relative">
          <img 
            src={images[0]} 
            alt={name} 
            className="w-full h-[170px] object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded text-sm z-10">
              {discount}%
            </span>
          )}
        </div>

        <div className="p-4 text-center flex-grow">
          <div className="h-[45px] text-left overflow-hidden">
            <div className={`text-base font-normal ${isHovered ? 'text-red-600' : 'text-black'}`}>
              {name}
            </div>
          </div>

          <p className="mt-5 h-[65px] overflow-hidden text-justify text-sm text-gray-600 bg-gradient-to-t from-transparent to-black bg-clip-text">
            {description}
          </p>

          <div className="flex gap-5 items-start mt-4">
            <div>
              <p className={`text-sm text-gray-500 ${discount > 0 ? 'line-through' : ''} ${discount < 1 ? 'text-2xl' : 'text-sm'} mb-0`}>
                {formatCurrencyVND(price)}
              </p>
              {discount > 0 ? (
                <p className={`text-red-600 ${discount < 1 ? 'text-lg' : 'text-base'}`}>
                  {formatCurrencyVND(discountedPrice)}
                </p>
              ) : (
                <p className="invisible" />
              )}
            </div>
            
            <div className="mt-2 -mr-5">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index}
                  className={`text-sm ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-0 flex flex-col gap-2">
        <button
          ref={similarProduct}
          onClick={() => navigate(`/type/${type}`)}
          className="bg-red-600 text-white px-2 py-2 rounded text-xs font-semibold transform translate-x-full transition-all hover:bg-red-800 shadow-md hover:shadow-lg"
        >
          Sản phẩm tương tự
        </button>
        <button
          ref={viewDetailsRef}
          onClick={() => navigate(`/product-detail/${id}`)}
          className="bg-red-600 text-white px-2 py-2 rounded text-xs font-semibold transform translate-x-full transition-all hover:bg-red-800 shadow-md hover:shadow-lg"
        >
          Chi tiết sản phẩm
        </button>
      </div>
    </div>
  );
};

export default CardProduct;