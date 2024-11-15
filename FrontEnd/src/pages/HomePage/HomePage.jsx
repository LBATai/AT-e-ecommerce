import TypeProduct from '../../components/TypeProduct/TypeProduct';
import Slider from '../../components/Slider/Slider';
import CardProduct from '../../components/CardProduct/CardProduct';
import Navbar from '../../components/Navbar/Navbar';
import PaginationComponent from '../../components/Pagination/PaginationComponent';
import { WrapperHome, CardContainer,Card,PaginationContainer } from './style'; // Cập nhật import

const Homepage = () => {
  return (
    <div style={{ backgroundColor: '#F5F5F5' }}>
      <TypeProduct />
      <Slider />
      <WrapperHome>
        <Navbar />
        <CardContainer> {/* Sử dụng CardContainer */}
          {/* Lặp qua danh sách sản phẩm */}
          <Card>
            <CardProduct />
          </Card>
          <Card>
            <CardProduct />
          </Card>
          <Card>
            <CardProduct />
          </Card>
          <Card>
            <CardProduct />
          </Card>
        </CardContainer>
      </WrapperHome>
      <PaginationContainer>
        <PaginationComponent />
      </PaginationContainer>
      <br/>
    </div>
  );
};

export default Homepage;
