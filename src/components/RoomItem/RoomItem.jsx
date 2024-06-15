import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import './RoomItem.scss';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import formatPrice from '~/utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import IconLove from '../RoomPopular/IconLove';
import wishAPI from '~/services/apis/clientAPI/clientWishAPI';
import { t } from 'i18next';
import iconStar from '~/assets/svg/star.svg';

const RoomItem = (props) => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const [love, setLove] = useState(false);
    useEffect(() => {
        wishAPI.checkWish(props.infoRoom.id).then((res) => setLove(res));
    }, [props.infoRoom.id]);
    const navigate = useNavigate();

    const handleLinkToDetail = (idRoom) => {
        navigate(`/room-detail/${idRoom}`);
    };

    const stars = [];
    for (let i = 0; i < props.infoRoom.gradeRate; i++) {
        stars.push(<img key={i} src={iconStar} alt="icon__star" className="star" />);
    }

    return (
        <div className="col l-3 m-6 c-12">
            <div className="container__room paper">
                <Slider {...settings}>
                    {props?.infoRoom?.imageAccomsUrls?.map((image, index) => (
                        <div key={index} onClick={() => handleLinkToDetail(props?.infoRoom?.id)}>
                            <img src={image} alt="room_hot" className="image-home" />
                        </div>
                    ))}
                </Slider>
                {love !== null && <IconLove idHome={props?.infoRoom?.id} isFavorite={love} />}

                <div className="info__room">
                    <h2 onClick={() => handleLinkToDetail(props?.infoRoom?.id)}>{props?.infoRoom?.accomName}</h2>
                    <div className="obility__room">
                        <p>{props.infoRoom.accomCateName}</p>
                        {stars}
                    </div>
                    <div className="locate__room">
                        <FmdGoodIcon className="icon_locate" />
                        <p>{props?.infoRoom?.addressGeneral ? props?.infoRoom?.addressGeneral : ''}</p>
                    </div>
                    <div className="price__room">
                        <p>{`${t('numberCount.price')} ${formatPrice(props?.infoRoom?.pricePerNight)} ${t(
                            'numberCount.priceDay'
                        )}`}</p>
                        <p>{`${t('numberCount.view')} ${props?.infoRoom?.numView}`}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomItem;
