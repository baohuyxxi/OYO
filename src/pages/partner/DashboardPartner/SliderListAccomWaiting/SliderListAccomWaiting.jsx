import './SliderListAccomWaiting.scss';
import React from 'react';
import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import defaultHotelImage from '~/assets/img/defaultHotelImage.png'

export default function SliderListAccomWaiting({accomWaiting}) {
    var settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        
    };
    console.log(accomWaiting);
    return (
        <div className="slider-list-accom-waiting">
            <div className="slider-list-accom-waiting__content">
                <Slider {...settings}>
                    {accomWaiting.map((item, index) => (
                        <div key={index} className="slider-list-accom-waiting__item">
                            <div className="slider-list-accom-waiting__item__image">
                                <img src={ item?.logo? item?.logo: defaultHotelImage} alt="accom" className="image" />
                            </div>
                            <div className="slider-list-accom-waiting__item__overlay">
                                <div className="slider-list-accom-waiting__item__overlay__progress">{item.progress}%</div>
                                <DeleteOutlinedIcon className="slider-list-accom-waiting__item__overlay__delete" />
                                <Link to={`createHotel/generalInfo/${item.accomId}`} className="slider-list-accom-waiting__item__overlay__button">Tiếp tục</Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
