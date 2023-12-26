import { useEffect, useState } from 'react';
import './FavoritesPage.scss';

import wishAPI from '~/services/apis/clientAPI/clientWishAPI';
import formatPrice from '~/utils/formatPrice';
import IconLoveLike from '~/components/IconLoveLike/IconLoveLike';
import { useNavigate } from 'react-router-dom';
import FramePage from '~/components/FramePage/FramePage';
import LinearProgress from '@mui/material/LinearProgress';
import { transLateListTitle } from '~/services/apis/translateAPI/translateAPI';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { t } from 'i18next';
AOS.init();

const FavoritesPage = () => {
    const [listDataFavorites, setListDataFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        wishAPI.getAllFavoritesRoom().then(async (dataResponse) => {
         
            const data = await Promise.all (dataResponse.data.content.flatMap((item) => {
                return transLateListTitle(item);
            }))
            setListDataFavorites(data);
            if (dataResponse.data.content.length !== 0) {
                setLoading(false);
            }
        });
    }, []);

    const handleLinkToDetail = (idRoom) => {
        navigate(`/room-detail/${idRoom}`);
    };

    return (
        <FramePage>
            <div className="favorites__page">
                {loading ? (
                    <div className="no__favorites">
                        <h1>{t('title.love')}</h1>
                        <h2>{t('title.firstLove')}</h2>
                        <p>{t('contentMain.love')}</p>
                        <LinearProgress />
                    </div>
                ) : (
                    <div className="yes__favorites">
                        <h1>{t('title.love')}</h1>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false"
                            data-aos-anchor-placement="top-center"
                        >
                            <div className="row">
                                {listDataFavorites?.map((room, index) => (
                                    <div className="col l-4" key={index}>
                                        <div className="card-item__favorite paper">
                                            <div
                                                className="content__favorite"
                                                onClick={() => handleLinkToDetail(room?.id)}
                                            >
                                                <img src={room?.imageAccomsUrls[0]} alt="" />
                                                <p className="name__favorite">{room?.accomName}</p>
                                                <p className="price__favorite">{`${t('label.pricelove')} ${formatPrice(
                                                    room?.pricePerNight
                                                )}`}</p>
                                                <p className="book-now">{t('common.bookRightNow')}</p>
                                            </div>
                                            <IconLoveLike idHome={room?.id} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </FramePage>
    );
};

export default FavoritesPage;
