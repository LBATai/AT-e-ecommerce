import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlideWrapper, SlideItem } from './style';

import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';

const sliderData = [
  { id: 1, image: slide1, alt: 'Slide 1' },
  { id: 2, image: slide2, alt: 'Slide 2' },
  { id: 3, image: slide3, alt: 'Slide 3' },
];

const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {sliderData.map((slide) => (
          <SlideItem key={slide.id}>
            <img src={slide.image} alt={slide.alt} />
          </SlideItem>
        ))}
      </Slider>
    </SlideWrapper>
  );
};

export default CustomSlider;
