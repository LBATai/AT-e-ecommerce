import { WrapperFooter, WrapperFooterSection, WrapperFooterTitle, WrapperFooterText, SocialIcon } from './style';
import { Col, Row } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <WrapperFooter>
      <Row gutter={[16, 16]}>
        {/* Column 1: Contact Info */}
        <Col xs={24} sm={12} md={6}>
          <WrapperFooterSection>
            <WrapperFooterTitle>Liên hệ</WrapperFooterTitle>
            <WrapperFooterText>Địa chỉ: 123 Đường ABC, TP. Đà Nẵng</WrapperFooterText>
            <WrapperFooterText>Số điện thoại: (012) 3456 7890</WrapperFooterText>
            <WrapperFooterText>Email: support@atecommerce.com</WrapperFooterText>
          </WrapperFooterSection>
        </Col>

        {/* Column 2: Policy Links */}
        <Col xs={24} sm={12} md={6}>
          <WrapperFooterSection>
            <WrapperFooterTitle>Chính sách</WrapperFooterTitle>
            <WrapperFooterText>Chính sách bảo mật</WrapperFooterText>
            <WrapperFooterText>Điều khoản sử dụng</WrapperFooterText>
            <WrapperFooterText>Chính sách hoàn trả</WrapperFooterText>
          </WrapperFooterSection>
        </Col>

        {/* Column 3: Customer Support */}
        <Col xs={24} sm={12} md={6}>
          <WrapperFooterSection>
            <WrapperFooterTitle>Hỗ trợ khách hàng</WrapperFooterTitle>
            <WrapperFooterText>FAQ</WrapperFooterText>
            <WrapperFooterText>Hướng dẫn đặt hàng</WrapperFooterText>
            <WrapperFooterText>Chính sách vận chuyển</WrapperFooterText>
          </WrapperFooterSection>
        </Col>

        {/* Column 4: Social Media Links */}
        <Col xs={24} sm={12} md={6}>
          <WrapperFooterSection>
            <WrapperFooterTitle>Theo dõi chúng tôi</WrapperFooterTitle>
            <SocialIcon>
              <FacebookOutlined style={{ fontSize: '24px', color: '#074398' }} />
              <TwitterOutlined style={{ fontSize: '24px', color: '#074398' }} />
              <InstagramOutlined style={{ fontSize: '24px', color: '#074398' }} />
              <YoutubeOutlined style={{ fontSize: '24px', color: '#074398' }} />
            </SocialIcon>
          </WrapperFooterSection>
        </Col>
      </Row>
    </WrapperFooter>
  );
};

export default Footer;
