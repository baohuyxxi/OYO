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
                            <div className='container__room paper'>
                                <Slider {...settings}>
                                    {home?.imageAccomsUrls.length !== 0 &&
                                        home?.imageAccomsUrls?.map((image, index) => (
                                            <div key={index}>
                                                <img src={image} alt="room_hot" className="image-home" />
                                            </div>
                                        ))}
                                </Slider>
                                {/* <IconLove idHome={home?.id} isFavorite={home?.isFavorite} /> */}
                                <div className="info__room" onClick={() => handleLinkToDetail(home?.id)}>
                                    <h2>{home?.accomName}</h2>
                                    <div className="obility__room">
                                        <p>{home.accomCateName}</p>
                                    </div>
                                    <div className="locate__room">
                                        {/* <FmdGoodIcon className="icon_locate" /> */}
                                        <p>{home?.addressGeneral ? home?.addressGeneral : null}</p>
                                    </div>
                                    <div className="price__room">
                                        <p>{`${t('numberCount.price')} ${formatPrice(home?.pricePerNight)} ${t(
                                            'numberCount.priceDay'
                                        )}`}</p>
                                        <p>{`${t('numberCount.view')} ${home?.numView}`}</p>
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
