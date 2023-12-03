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

const mockData = [
    {
        id: '1',
        imagesOfHome: [
            {
                id: '1',
                path: 'https://yes-hotel-da-nang.hotelmix.vn/data/Photos/OriginalPhoto/12003/1200390/1200390304/Yes-Hotel-Da-Nang-Exterior.JPEG'
            },
            { id: '2', path: 'https://www.navadahotel.com/FileStorage/Room/Thumbnail/DSC_7805-HDR.jpg' },
            { id: '3', path: 'https://manmo3h.com/app/webroot/upload/thuha/images/cach-tinh-gia-nha-nghi.jpg' }
        ],
        isFavorite: true,
        name: 'Resort Room 1',
        provinceName: 'Resort Province 1',
        costPerNightDefault: 200,
        view: 'Mountain View'
    },
    {
        id: '2',
        imagesOfHome: [
            { id: '4', path: 'https://www.angiakhang.com/uploads/contents/1585725082_add89c9d390c300acf65.jpg' },
            { id: '5', path: 'https://azgotravel.vn/storage/photos/8/top-10-khach-san-3-sao-dep-o-ho-chi-minh.jpg' },
            {
                id: '6',
                path: 'https://www.sapalaocai.com/sapalaocai-images/product/img1/T0PA9U4LU_Sa-Pa-Viilage-Hotel-13-645x430.jpg'
            }
        ],
        isFavorite: false,
        name: 'Resort Room 2',
        provinceName: 'Resort Province 2',
        costPerNightDefault: 250,
        view: 'Sea View'
    }
    // Add more mock data as needed
];

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
    const [listRoom] = useState(mockData);
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
                        <div className="col l-3 m-6 c-12" key={index}>
                            <Slider {...settings}>
                                {home?.imageAccomsUrls.length !== 0 &&
                                    home?.imageAccomsUrls?.map((image,index) => (
                                        <div key={index}>
                                            <img src={image} alt="room_hot" className="image-home" />
                                        </div>
                                    ))}
                            </Slider>
                            {/* <IconLove idHome={home?.id} isFavorite={home?.isFavorite} /> */}
                            <div className="info__room" onClick={() => handleLinkToDetail(home?.id)}>
                                <h2>{home?.accomName}</h2>
                                <div className="obility__room">
                                    <p>Resort</p>
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
                                    />
                                    <img
                                        src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/6/6a1fad158b76ff0ed231eceede8458f2.svg"
                                        alt="icon__star"
                                    />
                                </div>
                                <div className="locate__room">
                                    {/* <FmdGoodIcon className="icon_locate" /> */}
                                    <p>{home?.addressGeneral ? home?.addressGeneral : undefined}</p>
                                </div>
                                <div className="price__room">
                                    <p>{`${t('numberCount.price')} ${formatPrice(home?.pricePerNight)} ${t(
                                        'numberCount.priceDay'
                                    )}`}</p>
                                    <p>{`${t('numberCount.view')} ${home?.numView}`}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
