import React, { Component } from "react";
import Slider from "react-slick";
import bannerOne from "~/assets/imageBanner/banner3.jpg";
import bannerTwo from "~/assets/imageBanner/banner2.png";
import bannerThree from "~/assets/imageBanner/banner1.png";
import bannerFour from "~/assets/imageBanner/banner4.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeSlider.scss";
export default class SimpleSlider extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="slider__home">
        <Slider {...settings}>
          <div>
            <img src={bannerOne} alt="home" className="slider__home-item" />
          </div>
          <div>
            <img src={bannerTwo} alt="home" className="slider__home-item" />
          </div>
          <div>
            <img src={bannerThree} alt="home" className="slider__home-item" />
          </div>
          <div>
            <img src={bannerFour} alt="home" className="slider__home-item" />
          </div>
        </Slider>
      </div>
    );
  }
}
