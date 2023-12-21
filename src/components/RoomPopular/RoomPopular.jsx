import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './RoomPopular.scss';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useNavigate } from 'react-router-dom';
import SkeletonRoomItem from '../Skeleton/SkeletonRoomItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IconLove from './IconLove';
import publicAccomPlaceAPI from '../../services/apis/publicAPI/publicAccomPlaceAPI';
import formatPrice from '~/utils/formatPrice';
import iconStar from '~/assets/svg/star.svg';
import { t } from 'i18next';

export default function RoomPopular() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [listHome, setListHome] = useState();

    // const stars = [];
    // for (let i = 0; i < 5; i++) {
    //     stars.push(<img key={i} src={iconStar} alt="icon__star" className="star" />);
    // }

    const stars = (gradeRate) => {
        const stars = [];
        for (let i = 0; i < gradeRate; i++) {
            stars.push(<img key={i} src={iconStar} alt="icon__star" className="star" />);
        }
        return stars;
    }
    useEffect(() => {
        setLoading(true);
        publicAccomPlaceAPI.getTophome({ number: 0, size: 8 }).then((dataResponse) => {
            setListHome(dataResponse.data);
            setLoading(false);
        });
    }, []);

    const handleLinkToDetail = (idRoom) => {
        navigate(`/room-detail/${idRoom}`);
        // You can implement the navigation logic here
    };
    return (
        <div className="room__popular">
            <h1>{t('title.popularRoom')}</h1>
            <div className="row">
                {loading ? (
                    <SkeletonRoomItem />
                ) : (
                    listHome.content?.map((home, index) => (
                        <div className="col l-3 m-6 c-12 " key={index}>
                            <div className="container__room paper">
                                <Slider {...settings}>
                                    {home?.imageAccomsUrls.length !== 0 &&
                                        home?.imageAccomsUrls?.map((image, index) => (
                                            <div key={index} onClick={() => handleLinkToDetail(home?.id)}>
                                                <img src={image} alt="room_hot" className="image-home" />
                                            </div>
                                        ))}
                                </Slider>
                                {/* <IconLove idHome={home?.id} isFavorite={home?.isFavorite} /> */}
                                <div className="info__room">
                                    <h2 onClick={() => handleLinkToDetail(home?.id)}>{home?.accomName}</h2>
                                    <div className="obility__room">
                                        <p>{home.accomCateName}</p> {stars(home?.gradeRate)}
                                    </div>
                                    <div className="locate__room">
                                        <FmdGoodIcon className="icon_locate" />
                                        <p>{home?.addressGeneral ? home?.addressGeneral : null}</p>
                                    </div>
                                    <div className="price__room">
                                        <p>{`${formatPrice(home?.pricePerNight)}${t('numberCount.priceDay')}`}</p>
                                        <p>{`${home?.numView} ${t('numberCount.viewInDetal')}`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
