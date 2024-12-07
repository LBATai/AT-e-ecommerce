  import TypeProduct from '../../components/TypeProduct/TypeProduct';
  import Slider from '../../components/Slider/Slider';
  import CardProduct from '../../components/CardProduct/CardProduct';
  import Navbar from '../../components/Navbar/Navbar';
  import PaginationComponent from '../../components/Pagination/PaginationComponent';
  import { WrapperHome, CardContainer,PaginationContainer, NavbarContainer} from './style'; // Cập nhật import
  import { useQuery } from '@tanstack/react-query';
  import * as ProductService from '../../Service/ProductService'
  import { useSelector } from 'react-redux';
  import { useRef, useEffect, useState } from 'react';
  import Pending from '../../components/Pending/Pending'
  import { useDebounce } from '../../hooks/useDebounce';
  import ProductFilter from '../../components/ProductFilter/ProductFilter'

  const Homepage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 1000)
    const refSearch = useRef()
    const [stateProducts, setStateProducts] = useState([])
    const fetchProductAll = async (search) => {
      const res = await ProductService.getAllProduct(search);
      if (search.length > 0 || refSearch.current) {
        setStateProducts(res?.data)
      } else {
        return res
      }
    };

    const { data: products, isLoading, isError } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProductAll,
    });

    useEffect(() => {
      if (refSearch.current) {
        fetchProductAll(searchDebounce)
      }
      refSearch.current = true;
    }, [searchDebounce]);        

    useEffect(() => {
      if (products?.data?.length > 0) {
        setStateProducts(products?.data)
      }
    }, [products]); 
    
    return (
        <>
        <TypeProduct />
        <Slider />
        <WrapperHome>
        <NavbarContainer>
          <Navbar />
        </NavbarContainer>
          <div style={{ flex: 1, padding: '20px' }}>
          <Pending isPending={isLoading}>
            <ProductFilter />
            <CardContainer>
              {stateProducts?.map((product, index) => {
                return (
                  <CardProduct
                    key={product._id || index}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    discount={product.discount}
                    selled={product.selled}
                    id={product._id} />);
              })}
            </CardContainer>
            </Pending>
          </div>
        </WrapperHome>
        <PaginationContainer>
          <PaginationComponent />
        </PaginationContainer><br /></>
    );
  };

  export default Homepage;
