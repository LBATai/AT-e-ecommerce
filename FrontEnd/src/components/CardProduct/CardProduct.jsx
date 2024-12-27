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
    const step = direction === 'in' ? -5 : 10;

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


  const renderStars = () => {
    let numStars = 0;
    if (rating >= 1 && rating < 1.5) {
      numStars = 1;
    } else if (rating >= 1.5 && rating < 2.5) {
      numStars = 2;
    } else if (rating >= 2.5 && rating < 3.5) {
      numStars = 3;
    } else if (rating >= 3.5 && rating < 4.5) {
      numStars = 4;
    } else if (rating >= 4.5) {
      numStars = 5;
    }

    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    for (let i = 0; i < 5 - numStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    return stars;
  };


  return (
    <div
      className="w-full h-[400px] relative overflow-hidden border border-gray-300 flex flex-col 
                 transition-all duration-300 hover:border-gray-600 hover:shadow-lg rounded-lg bg-white"
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
            className="w-full h-[200px] object-cover rounded-t-lg"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-md text-sm font-medium z-10">
              -{discount}%
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="h-[50px] mb-2">
            <h3 className={`text-base font-medium line-clamp-2 transition-colors duration-300 
                         ${isHovered ? 'text-red-600' : 'text-gray-800'}`}>
              {name}
            </h3>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {description}
          </p>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              {renderStars()}
            </div>

            <div className="flex items-center gap-2">
              {discount > 0 && (
                <span className="text-gray-500 line-through text-sm">
                  {formatCurrencyVND(price)}
                </span>
              )}
              <span className="text-lg font-semibold text-red-600">
                {formatCurrencyVND(discount > 0 ? discountedPrice : price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-0 flex flex-col gap-2">
        <button
          ref={similarProduct}
          onClick={() => navigate(`/type/${type}`)}
          className="bg-red-600 text-white px-3 py-2 rounded-l-lg text-sm font-medium 
                   transform translate-x-full transition-transform duration-300 
                   hover:bg-red-700 shadow-md"
        >
          Sản phẩm tương tự
        </button>
        <button
          ref={viewDetailsRef}
          onClick={() => navigate(`/product-detail/${id}`)}
          className="bg-red-600 text-white px-3 py-2 rounded-l-lg text-sm font-medium 
                   transform translate-x-full transition-transform duration-300 
                   hover:bg-red-700 shadow-md"
        >
          Chi tiết sản phẩm
        </button>
      </div>
    </div>
  );
};

export default CardProduct;