import { Share2, Star, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as ProductService from '../../Service/ProductService';
import { useNavigate, useParams } from 'react-router';
import { formatCurrencyVND } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct, updateStock } from '../../components/redux/Slide/orderSlide';
import { message } from 'antd';
import CommentForm from '../../components/CommnetForm/CommnetForm'
import * as CommentService from '../../Service/CommentService';
import { Card, Rate } from 'antd';
import Pending from '../../components/Pending/Pending'; // Import Pending component

const { Meta } = Card;

const ProductDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);
    const navigate = useNavigate();
    const { id } = useParams();
    const [color, setColor] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [stateProductDetails, setStateProductDetails] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const dispatch = useDispatch();
    const stock = useSelector((state) => state.order.stock);
    const [size, setSize] = useState(stateProductDetails?.options?.[0]?.sizes?.[0]?.size || '');
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [productId, setProductId] = useState(id);
    const [comments, setComments] = useState([]);
    const [productRating, setProductRating] = useState(0);
    const [productCountRating, setProductCountRating] = useState(0);
    const [suggestedProducts, setSuggestedProducts] = useState([]); // Thêm state cho sản phẩm gợi ý
    const [isLoading, setIsLoading] = useState(false); // Thêm state loading

    useEffect(() => {
        if (id) {
            fetchData();

        }
    }, [id, productId]);
    const fetchData = async () => {
        setIsLoading(true); // Set loading true trước khi fetch
        try {
            await fetchGetDetailsProduct();
            await fetchCommentsByProduct();
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false); // Set loading false sau khi fetch xong
        }
    };
    const fetchCommentsByProduct = async () => {
        try {
            const response = await CommentService.getCommentsByProduct(productId);
            setComments(response.data);
        } catch (error) {
            message.error('Lỗi khi lấy bình luận.');
        }
    };

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
            setProductRating(res?.data?.rating);
            setProductCountRating(res?.data?.countRating);

            // Đặt màu mặc định là màu đầu tiên
            const defaultColor = res?.data?.options?.[0]?.color || '';
            setColor(defaultColor);
            setMainImage(res?.data?.images?.[0] || 'default-image-url');
            fetchSuggestedProducts(res?.data?.type, id); // Gọi fetch sản phẩm gợi ý, truyền cả id hiện tại
        }
        return res;
    };

    // Hàm fetch sản phẩm gợi ý
    const fetchSuggestedProducts = async (productType, currentProductId) => {
        try {
            // Gọi API để lấy các sản phẩm có cùng type
            const res = await ProductService.getAllProduct(null, productType);
            if (res?.data) {
                // Filter out the current product and take the first 4 products
                const filteredProducts = res.data.filter(product => product._id !== currentProductId);
                const limitedProducts = filteredProducts.slice(0, 4);
                setSuggestedProducts(limitedProducts);
            }
        } catch (error) {
            console.error('Error fetching suggested products:', error);
        }
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };
    const calculateDiscountedPrice = (price, discount) => {
        if (discount <= 0) return price;
        return price * (1 - discount / 100);
    };


    const renderStars = (rating) => {
        const maxRating = 5;
        return Array.from({ length: maxRating }, (_, index) => (
            <span key={index} className={`text-xl ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                {index < rating ? '★' : '☆'}
            </span>
        ));
    };

    // Tính giá sau khi giảm
    useEffect(() => {
        if (stateProductDetails && stateProductDetails.price) {
            const price = stateProductDetails.price * (1 - (stateProductDetails.discount || 0) / 100);
            setDiscountedPrice(price);
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
            const reduxStock = stock[stockKey];
            const productStock = stateProductDetails.options
                ?.find((option) => option.color === color)
                ?.sizes.find((sizeOption) => sizeOption.size === size)?.countInStock;

            if (reduxStock !== undefined) {
                const productStockAfter = productStock + reduxStock;
                return productStockAfter
            }
            return productStock;
        }
        return stateProductDetails.countAllInStock;
    };


    //button addOrder product
    const handleAddOrderProduct = () => {
        if (!color || !size) {
            message.error('Vui lòng chọn màu sắc và kích thước.');
            return;
        }
        const hasSizes = stateProductDetails.options?.some((option) => option.sizes?.length > 0);
        const productImage = stateProductDetails.images?.[0];

        const stockKey = `${stateProductDetails.id}-${color}-${size}`;

        const reduxStock = stock[stockKey];
        const productStock = stateProductDetails.options
            ?.find((option) => option.color === color)
            ?.sizes.find((sizeOption) => sizeOption.size === size)?.countInStock;

        const currentStock =
            reduxStock !== undefined
                ? productStock
                : productStock;

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
                    color: color,
                    size: size,
                },
            })
        );

        dispatch(updateStock({ productId: stateProductDetails.id, color, size, quantity }));

        message.success('Thêm sản phẩm vào giỏ hàng thành công.');
        updateStockValues(quantity);
    };
    const handleCommentAdded = (productId, newRating, newCountRating) => {
        setProductRating(newRating);
        setProductCountRating(newCountRating);
        fetchCommentsByProduct();
    };
    const handleNavigateToProduct = (productId) => {
        navigate(`/product-detail/${productId}`);
    };


    return (
        <Pending isPending={isLoading}>
            <div className="container mx-auto my-8 px-4 md:px-8">
                <div className="text-sm text-gray-500 mb-4">
                    <span onClick={() => navigate('/home')} className="cursor-pointer hover:underline">Trang chủ</span>
                    <span> / </span>
                    <span className="cursor-pointer hover:underline">{stateProductDetails.type}</span>
                    <span> / </span>
                    <span>{stateProductDetails.name}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div className="rounded-lg overflow-hidden">
                        <img src={mainImage} alt="Product" className="w-full h-auto object-cover " />
                    </div>
                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{stateProductDetails.name}</h1>
                        <div className="flex items-center text-gray-600 mb-1">
                            <span>Mã sản phẩm:</span>
                            <span className="ml-1">{stateProductDetails.id}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-1">
                            <span>Tình trạng:</span>
                            <span className={`ml-1 font-medium ${color && size ? (getStockCount() === 0 ? "text-red-500" : "text-green-500") : ""}`}>{color && size ? (
                                getStockCount() === 0 ? (
                                    <span className="text-red-500">Hết hàng</span>
                                ) : (
                                    `${getStockCount()}`
                                )
                            ) : color ? (
                                <span className="text-green-500">Còn hàng</span> // Hiển thị "Còn hàng" nếu chỉ chọn màu mà chưa chọn kích thước
                            ) : (
                                <span>Chưa chọn màu và size</span>// Nếu chưa chọn màu và size, hiển thị trạng thái này
                            )}
                            </span>
                        </div>
                        {/* Display sold count */}
                        <div className="flex items-center text-gray-600 mb-1">
                            <span>Đã bán:</span>
                            <span className="ml-1">{stateProductDetails.selled || 0}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                            <span>Thương hiệu:</span>
                            <span className="ml-1">AT.Shop</span>
                        </div>
                        <div className="flex items-center mb-4">
                            {stateProductDetails.discount > 0 ? (
                                <>
                                    <span className="text-red-500 text-lg mr-2 font-medium">-{stateProductDetails.discount}%</span>
                                    <span className="text-gray-500 line-through mr-2">{formatCurrencyVND(stateProductDetails.price)}</span>
                                    <span className="text-2xl font-bold">{formatCurrencyVND(discountedPrice)}</span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold">{formatCurrencyVND(stateProductDetails.price)}</span>
                            )}
                        </div>

                        {/* Color Options */}
                        <div className="mb-4">
                            <div className="text-gray-700 font-medium mb-2">
                                <span>Màu sắc:</span>
                            </div>
                            <div className="flex space-x-2">
                                {stateProductDetails.options?.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`px-3 py-1 rounded-md border cursor-pointer ${color === option.color ? 'bg-gray-200 border-blue-500' : 'border-gray-300 hover:bg-gray-100'}`}
                                        onClick={() => handleColorChange(option.color)}
                                    >
                                        {option.color}
                                    </button>
                                ))}
                            </div>
                        </div>


                        {color && (
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-gray-700 font-medium mb-2">
                                    <span>Kích thước:</span>
                                    <a href="#" className="text-blue-500 text-sm hover:underline">Hướng dẫn chọn size</a>
                                </div>
                                <div className="flex flex-wrap space-x-2 ">
                                    {[...stateProductDetails.options?.find((option) => option.color === color)?.sizes.map(sizeOption => sizeOption.size)]
                                        .filter((value, index, self) => self.indexOf(value) === index)
                                        .map((sizeOption, index) => (
                                            <button
                                                key={index}
                                                className={`px-3 py-1 rounded-md border cursor-pointer ${size === sizeOption ? 'bg-gray-200 border-blue-500' : 'border-gray-300 hover:bg-gray-100'}`}
                                                onClick={() => handleSizeChange(sizeOption)}
                                            >
                                                {sizeOption}
                                            </button>
                                        ))}
                                </div>
                            </div>
                        )}
                        {/* Quantity */}
                        <div className="flex items-center mt-4">
                            <span className="text-gray-700 font-medium mr-2">Số lượng:</span>
                            <div className="flex border rounded-md overflow-hidden">
                                <button
                                    onClick={handleDecrement}
                                    disabled={quantity <= 1}
                                    className="px-3 py-1  hover:bg-gray-100 focus:outline-none"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min={1}
                                    max={getStockCount()}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-12 px-2 py-1 text-center focus:outline-none"
                                />
                                <button
                                    onClick={handleIncrement}
                                    disabled={quantity >= getStockCount()}
                                    className="px-3 py-1  hover:bg-gray-100 focus:outline-none"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex space-x-4 mt-4">
                            <button
                                onClick={handleAddOrderProduct}
                                disabled={!color || !size || getStockCount() === 0 || quantity > getStockCount()}
                                className="bg-gray-200  text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                THÊM VÀO GIỎ
                            </button>
                            <button
                                onClick={handleAddOrderProduct}
                                disabled={!color || !size || getStockCount() === 0 || quantity > getStockCount()}
                                className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                MUA NGAY
                            </button>
                        </div>

                        {/* Promotion */}
                        <button className="bg-yellow-400 text-black font-medium py-2 px-4 mt-4 rounded-md w-full hover:bg-yellow-500">
                            CLICK VÀO ĐÂY ĐỂ NHẬN ƯU ĐÃI
                        </button>

                        {/* Share */}
                        <div className="flex items-center mt-4">
                            <span className="text-gray-700 font-medium mr-2">Chia sẻ:</span>
                            <div className="flex space-x-2">
                                <button className="bg-blue-500 text-white rounded-md p-1"><Share2 size={20} /></button>
                                <button className="bg-blue-400 text-white rounded-md p-1"><Share2 size={20} /></button>
                                <button className="bg-pink-500 text-white rounded-md p-1"><Share2 size={20} /></button>
                                <button className="bg-gray-300 rounded-md p-1"><Share2 size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8">
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setActiveTab('description')}
                                className={`py-2 px-4 font-medium focus:outline-none ${activeTab === 'description' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-700 hover:text-gray-900'}`}
                            >
                                MÔ TẢ SẢN PHẨM
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`py-2 px-4 font-medium focus:outline-none ${activeTab === 'reviews' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-700 hover:text-gray-900'}`}
                            >
                                ĐÁNH GIÁ ({comments.length})
                            </button>
                        </div>
                    </div>

                    {/* Tab Contents */}
                    <div className={`mt-4 ${activeTab === 'description' ? 'block' : 'hidden'}`}>
                        <h3 className="text-xl font-bold mb-2">Thông tin sản phẩm:</h3>
                        <p className="text-gray-700 whitespace-pre-line">{stateProductDetails?.description}</p>
                    </div>
                    <div className={`mt-4 ${activeTab === 'reviews' ? 'block' : 'hidden'}`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <span className="text-4xl font-bold mr-2">{productRating}</span>
                                <div className="flex items-center ">
                                    {renderStars(Math.round(productRating))}
                                </div>
                                <span className="ml-2 text-gray-600">{productCountRating} đánh giá</span>
                            </div>
                            <button
                                onClick={handleWriteReview}
                                className="px-4 py-2 flex items-center bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300"
                            >
                                <MessageCircle size={16} className="mr-1" />
                                Viết đánh giá
                            </button>
                        </div>
                        {isReviewFormVisible && (
                            <CommentForm
                                onClose={() => setIsReviewFormVisible(false)}
                                isOpen={isReviewFormVisible}
                                onCommentAdded={handleCommentAdded}
                            />
                        )}
                        <div className="mt-4">
                            {comments.map((comment) => (
                                <div key={comment._id} className="bg-white p-4 rounded-md shadow-md mb-4">
                                    <div className="flex items-center mb-2">
                                        {comment.avatarUser && (
                                            <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                                                <img src={comment.avatarUser} alt={`${comment.nameUser}'s avatar`} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <span className="font-medium">{comment.nameUser}</span>
                                        <span className="mx-2">|</span>
                                        <div className="flex items-center">
                                            {renderStars(comment.rating)}
                                        </div>
                                    </div>
                                    <div className="text-gray-600 text-sm mb-2">
                                        {new Date(comment.created).toLocaleDateString('vi-VN')}
                                    </div>
                                    <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
                                    {/* Nếu có ảnh đính kèm, hiển thị chúng */}
                                    {comment.images?.length > 0 && (
                                        <div className="flex space-x-2 mt-2">
                                            {comment.images.map((img, i) => (
                                                <img key={i} src={img} alt={`Review ${i + 1}`} className="w-16 h-16 object-cover rounded-md" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Suggested Products Section */}
                {suggestedProducts.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">Sản phẩm gợi ý</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {suggestedProducts.map((product) => (
                                <Card
                                    key={product._id}
                                    hoverable
                                    onClick={() => handleNavigateToProduct(product._id)}
                                    cover={
                                        <div className="relative h-[300px] overflow-hidden">
                                            <img
                                                alt={product.name}
                                                src={product.images[0] || "/api/placeholder/300/300"}
                                                className="w-full h-full object-cover"
                                            />
                                            {product.discount > 0 && (
                                                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded">
                                                    -{product.discount}%
                                                </div>
                                            )}
                                        </div>
                                    }
                                >
                                    <Meta
                                        title={product.name}
                                        description={
                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-lg font-bold text-primary">
                                                        {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                                                    </span>
                                                    {product.discount > 0 && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            {formatPrice(product.price)}
                                                        </span>
                                                    )}
                                                </div>
                                                <Rate disabled defaultValue={product.rating || 4} size="small" />
                                            </div>
                                        }
                                    />
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Pending>
    );
};

export default ProductDetail;