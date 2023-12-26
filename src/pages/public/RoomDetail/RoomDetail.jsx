import './RoomDetail.scss';
import { t } from 'i18next';
import moment from 'moment';
import format from 'date-fns/format';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import iconStar from '~/assets/svg/star.svg';
import ListImage from '~/components/ListImage/ListImage';
import Convenient from '~/components/Convenient/Convenient';
import DialogConvenient from '~/components/DialogConvenient/DialogConvenient';
import SurchargeList from './Surcharge';
import DateGo from '~/components/DateGo/DateGo';
import Dropdown from '~/components/Dropdown/Dropdown';
import PopoverPrice from '~/components/PopoverPrice/PopoverPrice';
import CommentReview from '~/components/CommentReview/CommentReview';
import FramePage from '~/components/FramePage/FramePage';
import DateIsBooking from '~/components/DateIsBooking/DateIsBooking';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import SkeletonRoomDetail from '~/components/Skeleton/SkeletonRoomDetail';
import formatPrice from '~/utils/formatPrice';
import wishAPI from '~/services/apis/clientAPI/clientWishAPI';
import bookingSlice from '~/redux/bookingSlice';
import { guestsModel } from '~/share/models/booking';
import { transLateRoom } from '~/services/apis/translateAPI/translateAPI';
export default function RoomDetail() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const roomId = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.current);
    const [loading, setLoading] = useState(true);
    const [dataDetailHome, setDataDetalHome] = useState('');
    const [dateBook, setDateBook] = useState([moment().format('DD/MM/yyyy'), moment().format('DD/MM/yyyy')]);
    const [guests, setGuests] = useState(guestsModel);
    const [detailPrice, setDetailPrice] = useState([]);
    const [surcharge, setSurcharge] = useState('');
    const [totalBill, setTotalBill] = useState('');
    const [disBooking, setDisBooking] = useState(true);
    const [love, setLove] = useState(null);
    const stars = [];
    for (let i = 0; i < dataDetailHome.gradeRate; i++) {
        stars.push(<img key={i} src={iconStar} alt="icon__star" className="star" />);
    }

    useEffect(() => {
        publicAccomPlaceAPI.getRoomDetail(roomId.id).then(async (dataResponse) => {
            const data = await transLateRoom(dataResponse.data);
            setDataDetalHome(data);
            setLoading(false);
        });
        wishAPI.checkWish(roomId.id).then((res) => setLove(res));
    }, [roomId?.id]);

    useEffect(() => {
        if (dateBook[0] !== dateBook[1]) {
        }
        const dataCheck = {
            checkIn: dateBook[0],
            checkOut: dateBook[1],
            accomId: roomId.id,
            numAdult: guests.numAdult
        };
        publicAccomPlaceAPI.checkBooking(dataCheck).then((response) => {
            setSurcharge(response.data.costSurcharge);
            setTotalBill(response?.data?.totalBill);
            if (response?.statusCode === 200) {
                setDisBooking(false);
            } else {
                setDisBooking(true);
            }
        });
    }, [guests.numAdult, dateBook]);

    const handleBooking = () => {
        if (user === null || user === undefined) {
            enqueueSnackbar(t('message.warningSignin'), { variant: 'warning' });
        } else {
            const dataBooking = {
                checkIn: dateBook[0],
                checkOut: dateBook[1],
                accomId: roomId.id,
                guests: guests,
                priceDay: dataDetailHome?.pricePerNight,
                surcharge: surcharge,
                originPay: totalBill,
                nameCustomer: user.firstName + ' ' + user.lastName,
                phoneNumberCustomer: user.phone
            };
            dispatch(bookingSlice.actions.addInfoBooking(dataBooking));
            navigate('/booking');
        }
    };

    const handleChangeDayBooking = (value) => {
        const checkIn = format(value[0].startDate, 'dd/MM/yyyy');
        const checkOut = format(value[0].endDate, 'dd/MM/yyyy');
        setDateBook([checkIn, checkOut]);
    };
    const handleChangeGuests = (value) => {
        setGuests(value);
    };
    const handleLove = () => {
        wishAPI.likeFavoriteRoom(roomId.id).then((res) => {
            if (res.data.message === 'Add wish item success') {
                enqueueSnackbar(t('message.love'), { variant: 'success' });
            } else {
                enqueueSnackbar(t('message.unlove'), { variant: 'success' });
            }

            setLove(!love);
        });
    };
    return (
        <FramePage>
            {loading ? (
                <SkeletonRoomDetail />
            ) : (
                <>
                    <div className="content detail-room">
                        <div className="info-room">
                            <div className="header-room">
                                <h1>{dataDetailHome.accomName}</h1>
                                <div className="heading">
                                    <div className="heading__left">
                                        <div className="obility__room">
                                            <p>{dataDetailHome.accomCateId}</p>
                                            {stars}
                                        </div>
                                        <div className="locate__room">
                                            <FmdGoodIcon className="icon_locate" />
                                            <p>{dataDetailHome.addressGeneral}</p>
                                        </div>
                                    </div>
                                    <div className="heading__right">
                                        <p className="link__rate">
                                            {`(${dataDetailHome?.numView} ${t('numberCount.viewInDetal')})`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ListImage listImage={dataDetailHome.imageAccomsUrls} />
                            <div className="about-room">
                                <span style={{ fontWeight: '600', fontSize: 'large' }}>
                                    {t('contentMain.all')} {dataDetailHome?.accomCateName}:{' '}
                                </span>
                                <span>
                                    {dataDetailHome.numPeople} {t('title.bookingOfYou.client')},{' '}
                                    {dataDetailHome.numBedRoom} {t('label.bedroom')}, {dataDetailHome.numKitchen}{' '}
                                    {t('label.bathroom')}, {t('label.bathroom')} {dataDetailHome.numBathRoom},{' '}
                                    {t('home.acreage')}: {dataDetailHome.acreage} m²
                                </span>
                                <div className="row">
                                    <div className="col l-8 m-7 c-12">
                                        <div className="paper title-room">
                                            <div className="desc-room">
                                                <h2>{t('contentMain.descHome')}</h2>
                                                <p>{dataDetailHome.description}</p>
                                                <p>
                                                    {t('home.addressDetail')}: {dataDetailHome.addressDetail}
                                                </p>
                                            </div>

                                            <hr className="divider" />
                                            <h2>{t('contentMain.convenient')}</h2>
                                            <Convenient listConvenient={dataDetailHome.facilityCategoryList} row={2} />
                                            <DialogConvenient listConvenient={dataDetailHome.facilityCategoryList} />
                                            <hr className="divider" />
                                        </div>
                                        <DateIsBooking bookedDates={dataDetailHome.bookedDates} />
                                    </div>

                                    <div className="col l-4 m-5 c-12">
                                        <div className="card-book__detail paper">
                                            <div className="price-room">
                                                {formatPrice(dataDetailHome?.pricePerNight)}
                                                {t('numberCount.priceDay')}
                                            </div>
                                            <div className="date-book">
                                                <div className="title__date-book">
                                                    <p>{t('contentMain.fromDay')}</p>
                                                    <p>{t('contentMain.toDay')}</p>
                                                </div>
                                                <DateGo size="vertical" setDataDay={handleChangeDayBooking} />
                                            </div>
                                            <div className="count__guest">
                                                <Dropdown
                                                    guests={guests}
                                                    setGuests={setGuests}
                                                    handleChangeGuests={handleChangeGuests}
                                                />
                                            </div>

                                            <div className="line">
                                                <hr />
                                            </div>

                                            <div className="price-total">
                                                <div className="title-price">
                                                    <PopoverPrice detailPrice={detailPrice} />
                                                </div>
                                                <div className="real-price">
                                                    <p style={{ fontWeight: '550' }}>{formatPrice(totalBill)}</p>
                                                </div>
                                            </div>

                                            <SurchargeList data={dataDetailHome?.surchargeList} />
                                            {dataDetailHome.discount !== 0 && (
                                                <div className="discount-campain">
                                                    <div className="discount-campain__title">
                                                        <h2 className="title">
                                                            {t('title.discountCompain')}
                                                            {` ${dataDetailHome.discount}%`}
                                                        </h2>
                                                        <img
                                                            src="https://img.icons8.com/emoji/30/null/fire.png"
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <div className="btn-booking">
                                                <button
                                                    disabled={disBooking}
                                                    className="btn-booking-room"
                                                    onClick={handleBooking}
                                                >
                                                    {t('common.booking')}
                                                </button>
                                            </div>
                                            <div className="card-like" onClick={handleLove}>
                                                {love !== null &&
                                                    (love ? (
                                                        <>
                                                            <FavoriteIcon className="icon_love" />
                                                            <p>{t('common.unlove')}</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FavoriteBorderOutlinedIcon className="icon_love" />
                                                            <p>{t('common.love')}</p>
                                                        </>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CommentReview id={roomId.id} />
                        </div>
                    </div>
                </>
            )}
        </FramePage>
    );
}
