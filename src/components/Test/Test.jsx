
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import "./Test.scss";

const images = [
  "https://kenh14cdn.com/thumb_w/600/2016/adminyeunhiepanh-20130130020149-6-1458202078811.jpg",
  "data:image/jpeg;base64,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",
  "https://kenh14cdn.com/thumb_w/600/2016/adminyeunhiepanh-20130130020149-6-1458202078811.jpg",
  "https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-square-black-gold-border-square-border-frame-png-image_384814.jpg",
  "https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-square-black-gold-border-square-border-frame-png-image_384814.jpg",
];



function App() {
    const [imageWidth, setImageWidth] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(1);
  
    useEffect(() => {
      // Lấy chiều rộng của ảnh đầu tiên (giả sử các ảnh cùng kích thước)
      const firstImage = document.querySelector(".image-slider img");
      if (firstImage) {
        const width = firstImage.width;
        setImageWidth(width);
        
        // Tính số lượng ảnh hiển thị dựa trên kích thước ảnh và kích thước khung trượt
        const sliderFrameWidth = document.querySelector(".slider-frame").clientWidth;
        const calculatedSlidesToShow = Math.floor(sliderFrameWidth / width);
        setSlidesToShow(calculatedSlidesToShow);
      }
    }, []);
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: true,
    };
  
    return (
      <div className="App">
        <h1>Image Slider</h1>
        <div className="slider-frame">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
  
  export default App;