import React, { useState } from 'react';
import Slider from 'react-slick';
import './RoomPopular.scss';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useNavigate } from 'react-router-dom';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import IconLove from './IconLove';
import formatPrice from '~/utils/formatPrice';
import { t } from 'i18next';

const mockData = [
    {
        id: '1',
        imagesOfHome: [
            { id: '1', path: 'https://yes-hotel-da-nang.hotelmix.vn/data/Photos/OriginalPhoto/12003/1200390/1200390304/Yes-Hotel-Da-Nang-Exterior.JPEG' },
            { id: '2', path: 'https://www.navadahotel.com/FileStorage/Room/Thumbnail/DSC_7805-HDR.jpg' },
            { id: '3', path: 'https://manmo3h.com/app/webroot/upload/thuha/images/cach-tinh-gia-nha-nghi.jpg' },
        ],
        isFavorite: true,
        name: 'Resort Room 1',
        provinceName: 'Resort Province 1',
        costPerNightDefault: 200,
        view: 'Mountain View',
    },
    {
        id: '2',
        imagesOfHome: [
            { id: '4', path: 'https://www.angiakhang.com/uploads/contents/1585725082_add89c9d390c300acf65.jpg' },
            { id: '5', path: 'https://azgotravel.vn/storage/photos/8/top-10-khach-san-3-sao-dep-o-ho-chi-minh.jpg' },
            { id: '6', path: 'https://www.sapalaocai.com/sapalaocai-images/product/img1/T0PA9U4LU_Sa-Pa-Viilage-Hotel-13-645x430.jpg' },
        ],
        isFavorite: false,
        name: 'Resort Room 2',
        provinceName: 'Resort Province 2',
        costPerNightDefault: 250,
        view: 'Sea View',
    },
    // Add more mock data as needed
];

export default function RoomPopular() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const navigate = useNavigate();

    const [listRoom] = useState(mockData);

    const handleLinkToDetail = (idRoom) => {
        navigate(`/roomDetail/${idRoom}`);
        // You can implement the navigation logic here
        console.log('Navigating to room with ID:', idRoom);
    };

    return (
        <div className="room__popular">
            <h1>{t('title.popularRoom')}</h1>
            <div className="row">
                {listRoom.map((room, index) => (
                    <div className="col l-3 m-6 c-12" key={index}>
                        <Slider {...settings}>
                            {room.imagesOfHome.length !== 0 &&
                                room.imagesOfHome.map((image) => (
                                    <div key={image.id}>
                                        <img src={image.path} alt="room_hot" className="image-home" />
                                    </div>
                                ))}
                        </Slider>
                        <IconLove idHome={room.id} isFavorite={room.isFavorite} />
                        <div className="info__room" onClick={() => handleLinkToDetail(room.id)}>
                            <h2>{room.name}</h2>
                            <div className="obility__room">
                                <p>Resort</p>
                                {[1, 2, 3, 4, 5].map((star, starIndex) => (
                                    <img
                                        key={starIndex}
                                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6a1fad158b76ff0ed231eceede8458f2.svg"
                                        alt="icon__star"
                                    />
                                ))}
                            </div>
                            <div className="locate__room">
                                <FmdGoodIcon className="icon_locate" />
                                <p>{room.provinceName ? room.provinceName : undefined}</p>
                            </div>
                            <div className="price__room">
                                <p>{`${t('numberCount.price')} ${formatPrice(room.costPerNightDefault)} ${t('numberCount.priceDay')}`}</p>
                                <p>{`${t('numberCount.view')} ${room.view}`}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
