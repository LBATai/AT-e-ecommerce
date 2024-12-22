import { Share2, Star, MessageCircle } from 'lucide-react';
import {
  ReviewAvatar,
  DiscountStyle,
  ProductContainer,
  Breadcrumb,
  ProductGrid,
  ProductImage,
  ProductInfo,
  InfoRow,
  Price,
  ColorButton,
  SizeButton,
  QuantityWrapper,
  QuantityButton,
  QuantityInput,
  ActionButton,
  PromotionButton,
  ShareWrapper,
  ShareButton,
  TabWrapper,
  TabButton,
  TabContent,
  ReviewCard,
  RatingWrapper,
  RatingScore,
  StarWrapper,
  ReviewWrapper,
  ReviewHeader,
  ReviewDate,
  ReviewImages,
  ReviewImage,
  DiscountedPriceStyle
} from './style';
import { useEffect, useState } from 'react';
import * as ProductService from '../../Service/ProductService';
import { useNavigate, useParams } from 'react-router';
import { formatCurrencyVND } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct, updateStock } from '../../components/redux/Slide/orderSlide';
import { message } from 'antd';
import CommentForm from '../../components/CommnetForm/CommnetForm'
import * as CommentService from '../../Service/CommentService';
const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
  const navigate = useNavigate();
  const { id } = useParams();
  const [color, setColor] = useState('');
  const [mainImage, setMainImage] = useState(''); // Image chính sẽ hiển thị
  const [stateProductDetails, setStateProductDetails] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.order.stock); // Lấy stock từ Redux store
  const [size, setSize] = useState(stateProductDetails?.options?.[0]?.sizes?.[0]?.size || ''); // Giá trị mặc định từ dữ liệu API
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [productId, setProductId] = useState(id);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      fetchGetDetailsProduct();
      fetchCommentsByProduct();
    }
  }, [id, productId]);
  const fetchCommentsByProduct = async () => {
    try {
      const response = await CommentService.getCommentsByProduct(productId);
      setComments(response.data);
    } catch (error) {
      message.error('Lỗi khi lấy bình luận.');
    }
  }
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(id);
    if (res?.data) {
      setStateProductDetails({
        id: res?.data._id,
        name: res?.data?.name,
        price: res?.data?.price,
        rating: res?.data?.rating,
        type: res?.data?.type,
        countAllInStock: res?.data?.countAllInStock,
        description: res?.data?.description,
        images: res?.data?.images,
        discount: res?.data?.discount,
        selled: res?.data?.selled,
        options: res?.data?.options,
      });
      // Đặt màu mặc định là màu đầu tiên
      const defaultColor = res?.data?.options?.[0]?.color || '';
      setColor(defaultColor);
      setMainImage(res?.data?.images?.[0] || 'default-image-url');
    }
    return res;
  };

  const renderStars = (rating) => {
    const maxRating = 5;
    return Array.from({ length: maxRating }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#FFD700' : '#CCC', fontSize: '20px' }}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  // Tính giá sau khi giảm
  useEffect(() => {
    if (stateProductDetails && stateProductDetails.price) {
      const price = stateProductDetails.price * (1 - (stateProductDetails.discount || 0) / 100);
      setDiscountedPrice(price); // Lưu giá trị vào state
    }
  }, [stateProductDetails]);

  const handleWriteReview = () => {
    setIsReviewFormVisible(true);
  };
  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };


  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };

  const updateStockValues = (quantity) => {
    setStateProductDetails((prevState) => {
      const updatedOptions = prevState.options.map((option) => {
        if (option.color === color) {
          const updatedSizes = option.sizes.map((sizeOption) => {
            if (sizeOption.size === size) {
              return {
                ...sizeOption,
                countInStock: sizeOption.countInStock,
              };
            }
            return sizeOption;
          });
          return {
            ...option,
            sizes: updatedSizes,
          };
        }
        return option;
      });

      return {
        ...prevState,
        countAllInStock: prevState.countAllInStock,
        options: updatedOptions,
      };
    });
  };
  const getStockCount = () => {
    if (color && size) {
      const stockKey = `${stateProductDetails.id}-${color}-${size}`;
      const reduxStock = stock[stockKey]; // Số lượng đã sử dụng trong Redux store
      const productStock = stateProductDetails.options
        ?.find((option) => option.color === color)
        ?.sizes.find((sizeOption) => sizeOption.size === size)?.countInStock; // Số lượng tồn kho từ chi tiết sản phẩm

      // Nếu `reduxStock` khác undefined, trả về `productStock - reduxStock`
      if (reduxStock !== undefined) {
        const productStockAfter = productStock + reduxStock;
        return productStockAfter
      }

      // Nếu không có trong Redux store, trả về `productStock`
      return productStock;
    }

    // Nếu không có `color` hoặc `size`, trả về số lượng tồn kho tổng cộng
    return stateProductDetails.countAllInStock;
  };

  //button addOrder product
  const handleAddOrderProduct = () => {
    // Kiểm tra xem người dùng đã chọn màu sắc và kích thước chưa
    if (!color || !size) {
      message.error('Vui lòng chọn màu sắc và kích thước.');
      return;
    }
    // Kiểm tra xem sản phẩm có kích thước không
    const hasSizes = stateProductDetails.options?.some((option) => option.sizes?.length > 0);
    // Lấy ảnh đầu tiên từ mảng images
    const productImage = stateProductDetails.images?.[0];


    const stockKey = `${stateProductDetails.id}-${color}-${size}`;

    // Lấy reduxStock từ Redux store
    const reduxStock = stock[stockKey];

    // Lấy productStock từ chi tiết sản phẩm
    const productStock = stateProductDetails.options
      ?.find((option) => option.color === color)
      ?.sizes.find((sizeOption) => sizeOption.size === size)?.countInStock;

    // Tính toán currentStock
    const currentStock =
      reduxStock !== undefined
        ? productStock // Nếu có trong Redux store, lấy productStock trừ reduxStock
        : productStock; // Nếu không, dùng productStock trực tiếp

    // Kiểm tra tồn kho
    if (currentStock <= 0) {
      message.error('Sản phẩm này đã hết hàng.');
      return;
    }

    if (quantity > currentStock) {
      message.error('Số lượng sản phẩm vượt quá số lượng còn lại.');
      return;
    }


    dispatch(
      addOrderProduct({
        orderItem: {
          product: stateProductDetails.id,
          amount: quantity,
          name: stateProductDetails.name,
          price: discountedPrice,
          image: productImage,
          type: stateProductDetails.type,
          color: color, // Sử dụng giá trị color từ state
          size: size,
        },
      })
    );

    dispatch(updateStock({ productId: stateProductDetails.id, color, size, quantity }));

    message.success('Thêm sản phẩm vào giỏ hàng thành công.');
    updateStockValues(quantity);
  };

  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      date: "2024-03-15",
      comment: "Áo rất đẹp và chất lượng. Mặc ấm, form áo vừa vặn. Sẽ ủng hộ shop dài dài.",
      images: ["/api/placeholder/100/100", "/api/placeholder/100/100"]
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 4,
      date: "2024-03-10",
      comment: "Áo đẹp, giao hàng nhanh. Chỉ có điều màu hơi sáng hơn trong ảnh một chút.",
      images: []
    }
  ];

  return (
    <ProductContainer>
      <Breadcrumb>
        <a onClick={() => navigate('/home')}>Trang chủ</a>
        <span> / </span>
        <a href="#">{stateProductDetails.type}</a>
        <span> / </span>
        <span>{stateProductDetails.name}</span>
      </Breadcrumb>

      <ProductGrid>
        <ProductImage>
          <img src={mainImage} alt="Product" />
        </ProductImage>

        <ProductInfo>
          <h1>{stateProductDetails.name}</h1>

          <InfoRow>
            <span>Mã sản phẩm:</span>
            <span>{stateProductDetails.id}</span>
          </InfoRow>
          <InfoRow>
            <span>Tình trạng:</span>
            <span className="status">
              {color && size ? (
                getStockCount() === 0 ? (
                  <span style={{ color: 'red' }}>Hết hàng</span>
                ) : (
                  getStockCount() > 0 ? (
                    `${getStockCount()}`
                  ) : (
                    <span style={{ color: 'red' }}>Hết hàng</span>
                  )
                )
              ) : color ? (
                <>Còn hàng</> // Hiển thị "Còn hàng" nếu chỉ chọn màu mà chưa chọn kích thước
              ) : (
                <>Chưa chọn màu và size</> // Nếu chưa chọn màu và size, hiển thị trạng thái này
              )}
            </span>
          </InfoRow>

          <InfoRow>
            <span>Thương hiệu:</span>
            <span>AT.Shop</span>
          </InfoRow>

          <DiscountStyle>-{stateProductDetails.discount}%</DiscountStyle>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <DiscountedPriceStyle>{formatCurrencyVND(stateProductDetails.price)}</DiscountedPriceStyle>
            <Price>{formatCurrencyVND(discountedPrice)}</Price>
          </div>

          <div>
            <div className="size-header">
              <span>Màu sắc:</span>
            </div>
            <div className="size-buttons">
              {stateProductDetails.options?.map((option, index) => (
                <ColorButton
                  key={index}
                  selected={color === option.color}
                  onClick={() => handleColorChange(option.color)}
                >
                  {option.color}
                </ColorButton>
              ))}
            </div>
          </div>

          {color && (
            <div style={{ marginTop: '20px' }}>
              <div className="size-header">
                <span>Kích thước:</span>
                <a href="#">Hướng dẫn chọn size</a>
              </div>
              <div className="size-buttons">
                {[...stateProductDetails.options?.find((option) => option.color === color)?.sizes.map(sizeOption => sizeOption.size)]
                  .filter((value, index, self) => self.indexOf(value) === index) // Loại bỏ các phần tử trùng lặp
                  .map((sizeOption, index) => (
                    <SizeButton
                      key={index}
                      selected={size === sizeOption}
                      onClick={() => handleSizeChange(sizeOption)}
                    >
                      {sizeOption}
                    </SizeButton>
                  ))}
              </div>
            </div>
          )}

          <QuantityWrapper style={{ marginTop: '20px' }}>
            <span style={{ marginRight: '10px' }}>Số lượng:</span>
            <div>
              <QuantityButton onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</QuantityButton>
              <QuantityInput min={1} max={getStockCount()} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
              <QuantityButton onClick={() => setQuantity(quantity + 1)} disabled={quantity >= getStockCount()}>+</QuantityButton>
            </div>
          </QuantityWrapper>

          <div className="actions">
            <ActionButton onClick={handleAddOrderProduct} variant="secondary" disabled={
              !color || !size || getStockCount() === 0 || quantity > getStockCount()
            }>THÊM VÀO GIỎ</ActionButton>
            <ActionButton onClick={handleAddOrderProduct} variant="primary" disabled={
              !color || !size || getStockCount() === 0 || quantity > getStockCount()
            }>MUA NGAY</ActionButton>
          </div>

          <PromotionButton>
            CLICK VÀO ĐÂY ĐỂ NHẬN ƯU ĐÃI
          </PromotionButton>

          <ShareWrapper>
            <span>Chia sẻ:</span>
            <div>
              <ShareButton color="facebook"><Share2 size={20} /></ShareButton>
              <ShareButton color="twitter"><Share2 size={20} /></ShareButton>
              <ShareButton color="pinterest"><Share2 size={20} /></ShareButton>
              <ShareButton><Share2 size={20} /></ShareButton>
            </div>
          </ShareWrapper>
        </ProductInfo>
      </ProductGrid>

      <TabWrapper>
        <div className="tab-buttons">
          <TabButton
            active={activeTab === 'description'}
            onClick={() => setActiveTab('description')}
          >
            MÔ TẢ SẢN PHẨM
          </TabButton>
          <TabButton
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          >
            ĐÁNH GIÁ ({comments.length})
          </TabButton>
        </div>

        <TabContent visible={activeTab === 'description'}>
          <h3>Thông tin sản phẩm:</h3>
          <p>{stateProductDetails?.description}</p>
        </TabContent>

        <TabContent visible={activeTab === 'reviews'}>
          <RatingWrapper>
            <div className="rating-summary">
              <RatingScore>{stateProductDetails?.rating}</RatingScore>
              <StarWrapper>
                {[...Array(stateProductDetails?.rating)].map((_, i) => (
                  <Star key={i} className="fill" />
                ))}
              </StarWrapper>
              <div className="rating-count">{comments.length} đánh giá</div>
            </div>
            <ActionButton onClick={handleWriteReview} variant="secondary" className="review-button">
              <MessageCircle size={16} />
              Viết đánh giá
            </ActionButton>
          </RatingWrapper>
          {isReviewFormVisible && (
            <CommentForm
              onClose={() => setIsReviewFormVisible(false)}
              isOpen={isReviewFormVisible}
              onCommentAdded={fetchCommentsByProduct}
            />
          )}
          <ReviewWrapper>
            {comments.map((comment) => (
              <ReviewCard key={comment._id}>
                <ReviewHeader>
                  {comment.avatarUser && (
                    <ReviewAvatar>
                      <img src={comment.avatarUser} alt={`${comment.nameUser}'s avatar`} />
                    </ReviewAvatar>
                  )}
                  <span className="username">{comment.nameUser}</span>
                  <span className="separator">|</span>
                  <StarWrapper>
                    {[...Array(comment.rating)].map((_, i) => (
                      <Star key={i} className="fill" />
                    ))}
                  </StarWrapper>
                </ReviewHeader>
                <ReviewDate>
                  {new Date(comment.created).toLocaleDateString('vi-VN')}
                </ReviewDate>
                <p>{comment.content}</p>
                {/* Nếu có ảnh đính kèm, hiển thị chúng */}
                {comment.images?.length > 0 && (
                  <ReviewImages>
                    {comment.images.map((img, i) => (
                      <ReviewImage key={i} src={img} alt={`Review ${i + 1}`} />
                    ))}
                  </ReviewImages>
                )}
              </ReviewCard>
            ))}
          </ReviewWrapper>

        </TabContent>
      </TabWrapper>
    </ProductContainer>
  );
};

export default ProductDetail;