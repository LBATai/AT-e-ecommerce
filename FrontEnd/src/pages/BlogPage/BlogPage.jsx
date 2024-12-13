import React from 'react';
import { WrapperBlog, ContentSection, Title, Paragraph } from './style';

const BlogPage = () => {
  return (
    <WrapperBlog className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <ContentSection className="bg-white p-6 rounded-lg shadow-md mb-6">
          <Title className="text-3xl font-semibold text-gray-800 mb-4">Thương mại điện tử toàn cầu</Title>
          <Paragraph className="text-lg text-gray-600">
            Thương mại điện tử toàn cầu đang phát triển mạnh mẽ với sự tham gia của hàng triệu doanh nghiệp và người tiêu dùng từ khắp nơi trên thế giới. Các nền tảng thương mại điện tử như Amazon, eBay, Alibaba đã tạo ra một thị trường toàn cầu cho hàng hóa và dịch vụ.
          </Paragraph>
          <Paragraph className="text-lg text-gray-600">
            Một trong những yếu tố quan trọng giúp thương mại điện tử toàn cầu phát triển là khả năng tiếp cận thông tin và sản phẩm từ bất kỳ đâu. Với sự phát triển của công nghệ và dịch vụ vận chuyển quốc tế, người tiêu dùng có thể mua sản phẩm từ bất kỳ quốc gia nào và nhận hàng nhanh chóng.
          </Paragraph>
        </ContentSection>

        <ContentSection className="bg-white p-6 rounded-lg shadow-md">
          <Title className="text-3xl font-semibold text-gray-800 mb-4">Thương mại điện tử trong nước</Title>
          <Paragraph className="text-lg text-gray-600">
            Thương mại điện tử trong nước đang ngày càng phát triển mạnh mẽ, đặc biệt là tại các quốc gia đang phát triển. Tại Việt Nam, các nền tảng như Shopee, Lazada, Tiki đã xây dựng được một hệ sinh thái thương mại điện tử vững mạnh, đáp ứng nhu cầu mua sắm ngày càng cao của người tiêu dùng trong nước.
          </Paragraph>
          <Paragraph className="text-lg text-gray-600">
            Các yếu tố như sự thuận tiện trong việc mua sắm, thanh toán trực tuyến an toàn và dịch vụ giao hàng nhanh chóng đã giúp thúc đẩy sự phát triển của thương mại điện tử tại Việt Nam. Ngoài ra, việc các doanh nghiệp trong nước đầu tư vào công nghệ và marketing cũng đóng vai trò quan trọng trong sự phát triển này.
          </Paragraph>
        </ContentSection>
      </div>
    </WrapperBlog>
  );
};

export default BlogPage;
