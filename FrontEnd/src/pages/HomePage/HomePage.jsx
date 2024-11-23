  import TypeProduct from '../../components/TypeProduct/TypeProduct';
  import Slider from '../../components/Slider/Slider';
  import CardProduct from '../../components/CardProduct/CardProduct';
  import Navbar from '../../components/Navbar/Navbar';
  import PaginationComponent from '../../components/Pagination/PaginationComponent';
  import { WrapperHome, CardContainer,PaginationContainer, } from './style'; // Cập nhật import
  import { useQuery } from '@tanstack/react-query';
  import * as ProductService from '../../Service/ProductService'
  const Homepage = () => {
    const fetchProductAll = async () => {
      return await ProductService.getAllProduct();
    };
    const { data: products, isLoading, isError } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProductAll,
    });        
    console.log('data', products)

    return (
      <div style={{ backgroundColor: '#F5F5F5', marginTop: '70px' }}>
        <TypeProduct/>
        <Slider />
        <WrapperHome>
          <Navbar />
          <CardContainer > {/* Sử dụng CardContainer */}
            {/* Lặp qua danh sách sản phẩm */}
              {products?.data?.map((product) =>{
                return <CardProduct 
                  key={product.id} 
                  countInStock={product.countInStock} 
                  description={product.description} 
                  image={product.image} 
                  name={product.name} 
                  price={product.price}
                  rating={product.rating} 
                  type={product.type}
                  discount={product.discount}
                  selled={product.selled}
                  />
              })}
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
