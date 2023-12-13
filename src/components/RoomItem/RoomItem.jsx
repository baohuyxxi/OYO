import React from 'react';
import Slider from 'react-slick';
import './RoomItem.scss';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import formatPrice from '~/utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import IconLove from '../RoomPopular/IconLove';
import { t } from 'i18next';

const RoomItem = (props) => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const navigate = useNavigate();

    const handleLinkToDetail = (idRoom) => {
        navigate(`/detail/${idRoom}`);
    };

    return (
        <div className="col l-3 m-6 c-12">
            <div className="container__room paper">
                <Slider {...settings}>
                    {props?.infoRoom?.imageAccomsUrls?.map((image, index) => (
                        <div key={index}>
                            <img src={image} alt="room_hot" className="image-home" />
                        </div>
                    ))}
                </Slider>
                <IconLove idHome={props?.infoRoom?.id} isFavorite={props?.infoRoom?.isFavorite} />
                <div className="info__room" onClick={() => handleLinkToDetail(props?.infoRoom?.id)}>
                    <h2>{props?.infoRoom?.accomName}</h2>
                    <div className="obility__room">
                        <p>{props.infoRoom.accomCateName}</p>
                        {/* <img
                            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6a1fad158b76ff0ed231eceede8458f2.svg"
                            alt="icon__star"
                        />
                        <img
                            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6a1fad158b76ff0ed231eceede8458f2.svg"
                            alt="icon__star"
                        />
                        <img
                            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6a1fad158b76ff0ed231eceede8458f2.svg"
                            alt="icon__star"
                        />
                        <img
                            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6a1fad158b76ff0ed231eceede8458f2.svg"
                            alt="icon__star"
                        />
                        <img
                            src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6a1fad158b76ff0ed231eceede8458f2.svg"
                            alt="icon__star"
                        /> */}
                    </div>
                    <div className="locate__room">
                        <FmdGoodIcon className="icon_locate" />
                        <p>{props?.infoRoom?.addressGeneral ? props?.infoRoom?.addressGeneral : ''}</p>
                    </div>
                    <div className="price__room">
                        <p>{`${t('numberCount.price')} ${formatPrice(props?.infoRoom?.pricePerNight)} ${t(
                            'numberCount.priceDay',
                        )}`}</p>
                        <p>{`${t('numberCount.view')} ${props?.infoRoom?.numView}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomItem;
