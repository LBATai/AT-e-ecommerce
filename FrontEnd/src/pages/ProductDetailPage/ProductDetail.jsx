import { useEffect, useState } from 'react';
import { Layout, Row, Col, Card, Button, Image, InputNumber, List, Breadcrumb  } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { WrapperProductDetail } from './style';
import image1 from '../../assets/images/Hoodies/Áo hoodie nỉ lót lông cừu.jpg';
import * as ProductService from '../../Service/ProductService';
import { useNavigate, useParams } from 'react-router';


const ProductDetail = () => {
  const navigate = useNavigate();
  const { Content } = Layout;
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("Đỏ");
  const [mainImage, setMainImage] = useState(image1); // Image chính sẽ hiển thị
  const [stateProductDetails, setStateProductDetails] = useState('')
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

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
        image: res?.data?.image,
        discount: res?.data?.discount,
        selled: res?.data?.selled
      })
   }
    return res
  }

 // Lấy id từ URL
  const product = {
    id: 1,
    name: "Áo hoodie nỉ lót lông cừu",
    description: "Đây là mô tả ngắn của sản phẩm.",
    price: "1000 USD",
    category: "Điện tử",
    brand: "Thương Hiệu",
    rating: 4,
    fullDescription: `
      Sản phẩm này được làm từ vật liệu chất lượng cao, đảm bảo độ bền và hiệu suất vượt trội.
      Phù hợp cho cả sử dụng cá nhân và chuyên nghiệp.
      Rất lý tưởng cho người đam mê công nghệ và sử dụng hàng ngày.
    `,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Đỏ", "Xanh Dương", "Xanh Lá", "Đen"],
    images: [image1, image1, image1, ], // Các ảnh phụ
  };

  const comments = [
    { author: "Nguyễn Văn A", content: "Sản phẩm tuyệt vời, rất đáng mua!", datetime: "2 ngày trước" },
    { author: "Lê Thị B", content: "Giá cả hợp lý, chất lượng ổn.", datetime: "5 ngày trước" },
  ];

  const recommendedProducts = [
    { id: 2, name: "Sản Phẩm 2", price: "500 USD", image: "path_to_image2" },
    { id: 3, name: "Sản Phẩm 3", price: "750 USD", image: "path_to_image3" },
    { id: 4, name: "Sản Phẩm 4", price: "1200 USD", image: "path_to_image4" },
  ];

  const renderStars = (rating) => {
    const maxRating = 5;
    return Array.from({ length: maxRating }, (_, index) => (
      <span key={index} style={{ color: index < rating ? '#FFD700' : '#CCC', fontSize: '20px' }}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <Layout style={{ backgroundColor: '#F5F5F5', padding: '20px' }}>
      <Content>
        <Breadcrumb style={{ marginBottom: '5px', marginTop: '50px', padding: '20px', fontSize: '16px'}}>
          <Breadcrumb.Item>
            <a onClick={() => navigate('/home')} style={{ cursor: 'pointer',color: '#000000', fontWeight:'600' }}>
              Shop
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a style={{ cursor: 'pointer',color: '#000000', fontWeight:'600'  }}>
              {stateProductDetails.type}
            </a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a style={{ cursor: 'pointer',color: '#000000', fontWeight:'600'  }}>
              {stateProductDetails.name}
            </a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <WrapperProductDetail>
          <Row gutter={[16, 16]}>
            <Col xs={20} md={10}>
              {/* Ảnh chính của sản phẩm */}
              <Image
                width="90%"
                src={mainImage}
                alt={name}
                style={{ borderRadius: '8px', marginBottom: '10px',marginLeft: '20px'}}
              />
              {/* Các ảnh phụ */}
              <Row gutter={[8, 8]} style={{marginLeft: '20px'}}>
                {product.images.map((img, index) => (
                  <Col key={index} span={7}>
                    <Image
                      width="100%"
                      src={img}
                      onClick={() => setMainImage(img)}
                      style={{
                        cursor: 'pointer',
                        border: mainImage === img ? '2px solid #FF4D4F' : '1px solid #CCC',
                        borderRadius: '4px',
                      }}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col xs={24} md={12}>
              <Card bordered={false}>
                <h1>{stateProductDetails.name}</h1>
                <h2 style={{ color: '#FF4D4F' }}>{formatCurrency(stateProductDetails.price)}</h2>

                <div style={{ margin: '10px 0' }}>
                  <strong>Đánh Giá:</strong> {renderStars(stateProductDetails.rating)}
                </div>

                <div style={{ marginTop: '20px' }}>
                  <span style={{ marginRight: '10px' }}>Số lượng hàng trong kho: {stateProductDetails.countInStock}</span>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <span style={{ marginRight: '10px' }}>Số lượng:</span>
                  <InputNumber min={1} max={10} value={quantity} onChange={(value) => setQuantity(value)} />
                </div>

                <div style={{ marginTop: '20px' }}>
                  <span style={{ marginRight: '10px' }}>Kích thước:</span>
                  <div>
                    {product.sizes.map((s) => (
                      <Button
                        key={s}
                        type={size === s ? "primary" : "default"}
                        onClick={() => setSize(s)}
                        style={{ marginRight: '5px', marginBottom: '5px' }}
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <span style={{ marginRight: '10px' }}>Màu sắc:</span>
                  <div>
                    {product.colors.map((c) => (
                      <Button
                        key={c}
                        type={color === c ? "primary" : "default"}
                        onClick={() => setColor(c)}
                        style={{ marginRight: '5px', marginBottom: '5px' }}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </div>

                <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
                  <Col>
                    <Button type="primary" icon={<ShoppingCartOutlined />} size="large">
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

          <div style={{ padding: '20px', marginTop: '20px' }}>
            <h2>Mô Tả Sản Phẩm</h2>
            <p>{stateProductDetails.description}</p>
          </div>

          <div style={{ padding: '20px', marginTop: '20px' }}>
            <h2>Đánh Giá từ Khách Hàng</h2>
            <List
              dataSource={comments}
              renderItem={(item) => (
                <div style={{ marginBottom: '15px' }}>
                  <strong>{item.author}</strong> - {item.datetime}
                  <p>{item.content}</p>
                </div>
              )}
            />
          </div>

          <div style={{ padding: '20px', marginTop: '20px' }}>
            <h2>Sản Phẩm Gợi Ý</h2>
            <Row gutter={[16, 16]}>
              {recommendedProducts.map((prod) => (
                <Col key={prod.id} xs={24} sm={12} md={8}>
                  <Card
                    hoverable
                    cover={<Image src={prod.image} alt={prod.name} />}
                  >
                    <Card.Meta title={prod.name} description={prod.price} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </WrapperProductDetail>
      </Content>
    </Layout>
  );
};

export default ProductDetail;
