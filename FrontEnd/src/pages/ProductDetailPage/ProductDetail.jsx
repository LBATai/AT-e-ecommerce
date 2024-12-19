import { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Button, Image, InputNumber, List, Breadcrumb, message   } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { WrapperProductDetail, PriceStyle, DiscountStyle,OriginalPriceStyle,DiscountedPriceStyle } from './style';
import * as ProductService from '../../Service/ProductService';
import { useLocation, useNavigate, useParams } from 'react-router';
import {formatCurrencyVND} from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../../components/redux/Slide/orderSlide';
import CommentSection from '../../components/CommentSection/CommentSection';
const ProductDetail = () => {
  const navigate = useNavigate();
  const { Content } = Layout;
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [mainImage, setMainImage] = useState(''); // Image chính sẽ hiển thị
  const [stateProductDetails, setStateProductDetails] = useState('')
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const user = useSelector((state) => state.user);
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id){
      fetchGetDetailsProduct()
    }
  }, [id]);
  const fetchGetDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(id)
    if (res?.data) {
      setStateProductDetails({
        id: res?.data._id,
        name: res?.data?.name,
        price: res?.data?.price,
        rating: res?.data?.rating,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        description: res?.data?.description,
        images: res?.data?.images,
        discount: res?.data?.discount,
        selled: res?.data?.selled,
        options: res?.data?.options,
      })
      setMainImage(res?.data?.images?.[0] || 'default-image-url');
   }
    return res
  }

  const [size, setSize] = useState(stateProductDetails?.options?.[0]?.sizes?.[0]?.size || ''); // Giá trị mặc định từ dữ liệu API

  const comments = [
    { author: "Nguyễn Văn A", content: "Sản phẩm tuyệt vời, rất đáng mua!", datetime: "2 ngày trước" },
    { author: "Lê Thị B", content: "Giá cả hợp lý, chất lượng ổn.", datetime: "5 ngày trước" },
  ];

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
  
  const handleSizeChange = (selectedSize) => {
    setSize(selectedSize);
  };

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor);
  };
  //button addOrder product
  const handleAddOrderProduct = () => {
    if (!color) {
      message.warning("Vui lòng chọn màu sắc trước khi thêm vào giỏ hàng.");
      return;
    }
    
    // Kiểm tra xem sản phẩm có kích thước không
    const hasSizes = stateProductDetails.options?.some(option => option.sizes?.length > 0);
    // Lấy ảnh đầu tiên từ mảng images
    const productImage = stateProductDetails.images?.[0] 
    if (hasSizes && !size) {
      message.warning("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.");
      return;
    }
      dispatch(addOrderProduct({
        orderItem: {
          product: stateProductDetails.id,
          amount: quantity,
          name: stateProductDetails.name,
          price: discountedPrice,
          image: productImage,
          type: stateProductDetails.type,
          color: color,  // Sử dụng giá trị color từ state
          size: size, 
        }
      }))
      message.success("Thêm sản phẩm vào giỏ hàng thành công.");
  }

return (
    <Layout style={{ backgroundColor: '#F5F5F5', padding: '20px' }}>
      <Content>
        <Breadcrumb style={{ marginBottom: '5px', marginTop: '50px', padding: '20px', fontSize: '16px' }}>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/home')} style={{ cursor: 'pointer', color: '#000000', fontWeight: '600' }}>
              Shop
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a style={{ cursor: 'pointer', color: '#000000', fontWeight: '600' }}>
              {stateProductDetails.type}
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a style={{ cursor: 'pointer', color: '#000000', fontWeight: '600' }}>
              {stateProductDetails.name}
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>

        <WrapperProductDetail>
          <Row gutter={[16, 16]}>
            <Col xs={20} md={10}>
              <Image
                width="90%"
                src={mainImage}
                alt={stateProductDetails.name}
                style={{ borderRadius: '8px', marginBottom: '10px', marginLeft: '20px' }}
              />
            <Row gutter={[8, 8]} style={{ marginLeft: '20px' }}>
              {stateProductDetails.images?.length > 1 &&
                stateProductDetails.images.map((image, index) => (
                  <Col key={index} span={7}>
                    <Image
                      width="100%"
                      src={image}
                      alt={`Image ${index + 1}`}
                      style={{
                        cursor: 'pointer',
                        border: mainImage === image ? '2px solid #FF4D4F' : '1px solid #CCC',
                        borderRadius: '4px',
                      }}
                      onClick={() => setMainImage(image)} // Đặt ảnh chính khi nhấn vào ảnh nhỏ
                    />
                  </Col>
                ))}
            </Row>

            </Col>
            <Col xs={24} md={12}>
              <Card bordered={false}>
                <h1>{stateProductDetails.name}</h1>
                <PriceStyle>
                  {stateProductDetails.discount > 0 ? (
                    <>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <OriginalPriceStyle>
                          {formatCurrencyVND(stateProductDetails.price)}
                        </OriginalPriceStyle>
                        <DiscountStyle>
                          -{stateProductDetails.discount}%
                        </DiscountStyle>
                      </div>
                      <DiscountedPriceStyle>
                        {formatCurrencyVND(discountedPrice)}
                      </DiscountedPriceStyle>
                    </>
                  ) : (
                    <div>{formatCurrencyVND(stateProductDetails.price)}</div>
                  )}
                </PriceStyle>
                <div style={{ margin: '10px 0' }}>
                  <strong>Đánh Giá:</strong> {stateProductDetails.rating} {renderStars(stateProductDetails.rating)} 
                </div>

                <div style={{ marginTop: '20px' }}>
                  <span style={{ marginRight: '10px' }}>Số lượng hàng trong kho:</span>
                  {color && size ? (
                    // Tìm và hiển thị số lượng theo màu sắc và kích thước đã chọn
                    stateProductDetails.options
                      .find(option => option.color === color) // Tìm màu sắc đã chọn
                      ?.sizes.find(sizeOption => sizeOption.size === size) // Tìm kích thước đã chọn
                      ?.countInStock === 0 ? (
                        <span style={{ color: 'red' }}>Hết hàng</span> // Hiển thị "Hết hàng" nếu số lượng = 0
                      ) : (
                        stateProductDetails.options
                          .find(option => option.color === color) // Tìm màu sắc đã chọn
                          ?.sizes.find(sizeOption => sizeOption.size === size) // Tìm kích thước đã chọn
                          ?.countInStock || 0 // Hiển thị số lượng hoặc 0 nếu không tìm thấy
                      )
                  ) : (
                    // Nếu chưa chọn màu sắc hoặc kích thước, hiển thị tổng số lượng hàng trong kho
                    stateProductDetails.countInStock === 0 ? (
                      <span style={{ color: 'red' }}>Hết hàng</span> // Hiển thị "Hết hàng" nếu tổng số lượng = 0
                    ) : (
                      stateProductDetails.countInStock
                    )
                  )}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <span style={{ marginRight: '10px' }}>Màu sắc:</span>
                  <div>
                    {stateProductDetails.options?.map((option, index) => (
                      <Button
                        key={index}
                        type={color === option.color ? "primary" : "default"}
                        onClick={() => handleColorChange(option.color)}
                        style={{ marginRight: '5px', marginBottom: '5px' }}
                      >
                        {option.color}
                      </Button>
                    ))}
                  </div>
                </div>

                {color && stateProductDetails.options?.find(option => option.color === color)?.sizes?.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <span style={{ marginRight: '10px' }}>Kích thước:</span>
                    <div>
                      {stateProductDetails.options
                        ?.find(option => option.color === color)
                        ?.sizes.map((sizeOption, index) => (
                          <Button
                            key={index}
                            type={size === sizeOption.size ? "primary" : "default"}
                            onClick={() => handleSizeChange(sizeOption.size)}
                            style={{ marginRight: '5px', marginBottom: '5px' }}
                          >
                            {sizeOption.size}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
                
                <div style={{ marginTop: '20px' }}>
                  <span style={{ marginRight: '10px' }}>Số lượng:</span>
                  <InputNumber min={1} max={10} value={quantity} onChange={(value) => setQuantity(value)} />
                </div>

                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                  <Col>
                    <Button onClick={handleAddOrderProduct} type="primary" icon={<ShoppingCartOutlined />} size="large">
                      Thêm vào Giỏ Hàng
                    </Button>
                  </Col>
                  <Col>
                    <Button type="default" icon={<HeartOutlined />} size="large">
                      Thêm vào Yêu Thích
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <div style={{ 
            whiteSpace: 'pre-line', 
            padding: '20px', 
            marginTop: '20px' 
          }}>
            <h2>Mô Tả Sản Phẩm</h2>
            <p>{stateProductDetails.description}</p>
          </div>

          <div style={{ padding: '20px', marginTop: '20px' }}>
            {/* Thêm CommentSection vào đây */}
            <CommentSection initialComments={comments} productId={stateProductDetails.id} />
          </div>
        </WrapperProductDetail>
      </Content>
    </Layout>
  );
};

export default ProductDetail;
