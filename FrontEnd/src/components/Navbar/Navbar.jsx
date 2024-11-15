import {WrapperNavbar, PriceRange, Star, WrapperCheckBox} from './style';
import { Input, Button, Checkbox  } from "antd";
import {
  
} from '@ant-design/icons';
const Navbar = () => {
  const starRows = [5, 4, 3, 2, 1];  
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <WrapperNavbar>
        <PriceRange>
          <div style={{marginBottom: '10px',fontSize: '18px',}}>Khoảng giá</div>
          <Input placeholder="đ Từ" style={{width: '100px',marginRight: '15px',}}/>
          <span>-</span>
          <Input placeholder="đ Đến" style={{width: '100px',marginLeft: '15px',}}/>
          <div>
            <Button type="primary" style={{marginTop: '10px',width: '235px',}}>Áp dụng</Button>
          </div>
        </PriceRange>
        <hr style={{width: '150px',marginTop: '20px', }} />
        <div>
          <div style={{marginBottom: '10px',marginTop: '20px',fontSize: '18px',}}>Đánh giá</div>
          {starRows.map((goldStarCount, rowIndex) => (
          <Star key={rowIndex}>
            {[...Array(5)].map((_, starIndex) => (
              <span
                key={starIndex}
                className="star" // Lớp cho sao vàng
                style={{ color: starIndex < goldStarCount ? '#FFD700' : '#FFD700', fontSize: '24px' }} // Màu vàng cho sao vàng và xám cho sao còn lại
              >
                {starIndex < goldStarCount ? '★' : '☆'}
              </span>
            ))}
          </Star>
        ))}   
        </div>
        <hr style={{width: '150px',marginTop: '20px', }} />
        <WrapperCheckBox>
          <div style={{marginBottom: '10px',marginTop: '20px',fontSize: '18px',}}>Nơi bán</div>
          <Checkbox onChange={onChange}>Hà Nội</Checkbox><br/>
          <Checkbox onChange={onChange}>Đà Nẵng</Checkbox><br/>
          <Checkbox onChange={onChange}>TP. Hồ Chí Minh</Checkbox><br/>
          <Checkbox onChange={onChange}>Quảng Trị</Checkbox><br/>
          <Checkbox onChange={onChange}>Quảng Nam</Checkbox><br/>
        </WrapperCheckBox>
    </WrapperNavbar>
  )
}

export default Navbar