import React, { Component } from "react"
import Slider from "react-slick"
import bannerOne from '../../assets/imageMaster/banner_1.webp'
import bannerTwo from '../../assets/imageMaster/banner_2.webp'
import bannerThree from '../../assets/imageMaster/banner_3.webp'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './HomeSlider.css'
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
        </Slider>

      </div>
    );
  }
}