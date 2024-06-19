import './RoomDetail.scss';
import { t } from 'i18next';
import moment from 'moment';
import format from 'date-fns/format';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';

import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addDays } from 'date-fns';
import iconStar from '~/assets/svg/star.svg';
import ListImage from '~/components/ListImage/ListImage';
import Facility from './Facility/Facility';
import DialogConvenient from '~/components/DialogConvenient/DialogConvenient';
import SurchargeList from './Surcharge';
import DrawerHome from '~/components/DrawerHome/DrawerHome';
import DateRangeSelector from '~/components/DateRangeSelector/DateRangeSelector';
import Dropdown from '~/components/Dropdown/Dropdown';
import NecessaryInformation from './NecessaryInformation/NecessaryInformation';
import GeneralPolicy from './GeneralPolicy/GeneralPolicy';
import CommentReview from '~/components/CommentReview/CommentReview';
import FramePage from '~/components/FramePage/FramePage';
import DateIsBooking from '~/components/DateIsBooking/DateIsBooking';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import SkeletonRoomDetail from '~/components/Skeleton/SkeletonRoomDetail';
import formatPrice from '~/utils/formatPrice';
import wishAPI from '~/services/apis/clientAPI/clientWishAPI';
import bookingSlice from '~/redux/bookingSlice';
import { guestsModel } from '~/models/booking';
import { transLateRoom } from '~/services/apis/translateAPI/translateAPI';
import { dayGap } from '~/utils/calculates';
import GoogleMap from '~/components/GoogleMap/GoogleMap';
import globalSlice from '~/redux/globalSlice';

export default function RoomDetail() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const roomId = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.current);
    const [loading, setLoading] = useState(true);
    const [dataDetailHome, setDataDetalHome] = useState('');
    const [dateBook, setDateBook] = useState([
        moment().format('DD/MM/yyyy'),
        moment(addDays(new Date(), 1)).format('DD/MM/yyyy')
    ]);

    const [guests, setGuests] = useState(guestsModel);
    const [detailPrice, setDetailPrice] = useState([]);
    const [surcharge, setSurcharge] = useState('');
    const [totalBill, setTotalBill] = useState(0);
    const [disBooking, setDisBooking] = useState(true);
    const [love, setLove] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
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
            const dataCheck = {
                checkIn: dateBook[0],
                checkOut: dateBook[1],
                accomId: roomId.id,
                numAdult: guests.numAdult
            };
            publicAccomPlaceAPI.checkBooking(dataCheck).then((response) => {
                setSurcharge(response.data.costSurcharge);
                setTotalBill(response?.data?.totalCostAccom);
                if (response?.statusCode === 200) {
                    setDisBooking(false);
                } else {
                    setDisBooking(true);
                }
            });
        }
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
                phoneNumberCustomer: user.phone,
                discount: dataDetailHome?.discount
            };
            dispatch(bookingSlice.actions.addInfoBooking(dataBooking));
            navigate('/booking');
        }
    };

    const handleChangeDayBooking = (startDate, endDate) => {
        const checkIn = format(startDate, 'dd/MM/yyyy');
        const checkOut = format(endDate, 'dd/MM/yyyy');
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
    const handleChat = () => {
        const dataChat = {
            open: true,
            id: dataDetailHome.accomId,
            name: dataDetailHome.nameHost,
            avatar: 'https://images.squarespace-cdn.com/content/v1/5b9d4d4a5cfd7967a7b39d4f/1561271571971-U5Z9ASBHPVWBMASIHUCT/chatbot+avatar+Cute_V9.png?format=1500w'
        };
        dispatch(globalSlice.actions.setChatbox(dataChat));
    };
    return (
        <FramePage>
            {loading ? (
                <SkeletonRoomDetail />
            ) : (
                <>
                    <div className="content detail-room">
                        {/* <BreadcrumbsHome data={dataDetailHome.addressDetail} /> */}

                        <div className="info-room">
                            <div className="header-room">
                                <h1>{dataDetailHome.accomName}</h1>

                                <div className="heading">
                                    <div className="heading__left">
                                        <div className="star-rating__home">
                                            {/* {dataDetailHome.accomCateId} */}
                                            {stars}
                                        </div>
                                        <div className="locate__room">
                                            <FmdGoodOutlinedIcon className="icon_locate" />
                                            <p>{dataDetailHome.addressDetail}</p>
                                        </div>
                                    </div>
                                    <div className="heading__right">
                                        <div className="card-like__container" onClick={handleLove}>
                                            {love !== null && (
                                                <div className="card-like">
                                                    {love === true ? (
                                                        <>
                                                            <FavoriteIcon className="icon_love" />
                                                            <p>{t('common.liked')}</p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FavoriteBorderOutlinedIcon className="icon_love" />
                                                            <p>{t('common.like')}</p>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <p className="link__rate">
                                            {`(${dataDetailHome?.numView} ${t('numberCount.viewInDetal')})`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ListImage
                                listImage={dataDetailHome.imageAccomsUrls}
                                setOpen={setOpenDrawer}
                                cldVideoId={dataDetailHome.cldVideoId}
                            />
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
                                        <hr className="divider" />
                                        <h2>{t('contentMain.convenient')}</h2>
                                        <Facility data={dataDetailHome.facilityCategoryList} />
                                        <DialogConvenient listConvenient={dataDetailHome.facilityCategoryList} />
                                        <hr className="divider" />
                                        <div className=" title-room">
                                            <div className="desc-room">
                                                <h2>{t('contentMain.descHome')}</h2>
                                                <p>{dataDetailHome.description}</p>
                                                <p>
                                                    {t('home.addressDetail')}: {dataDetailHome.addressDetail}
                                                </p>
                                            </div>

                                            <hr className="divider" />
                                            <NecessaryInformation />
                                            <GeneralPolicy
                                                cancellationPolicy={dataDetailHome.cancellationPolicy}
                                                cancellationFeeRate={dataDetailHome.cancellationFeeRate}
                                            />
                                        </div>
                                        <DateIsBooking bookedDates={dataDetailHome.bookedDates} />
                                    </div>

                                    <div className="col l-4 m-5 c-12">
                                        <div className="card-book__detail paper">
                                            {/* {dataDetailHome.discount !== 0 && (
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
                                            )} */}
                                            <div className="price-room">
                                                {formatPrice(
                                                    dataDetailHome?.pricePerNight * (1 - dataDetailHome?.discount / 100)
                                                )}
                                                {t('numberCount.priceDay')}
                                            </div>
                                            {dataDetailHome.discount > 0 && (
                                                <div style={{ display: 'flex' }}>
                                                    <div className="price-room root">
                                                        {formatPrice(dataDetailHome?.pricePerNight)}
                                                        {t('numberCount.priceDay')}
                                                    </div>
                                                    <div className="discount-percent">
                                                        <p>{`-${dataDetailHome.discount}%`}</p>
                                                    </div>
                                                </div>
                                            )}
                                            <DateRangeSelector
                                                dateBook={dateBook}
                                                setDataDay={handleChangeDayBooking}
                                            />

                                            <Dropdown
                                                guests={guests}
                                                setGuests={setGuests}
                                                handleChangeGuests={handleChangeGuests}
                                            />

                                            <div className="line">
                                                <hr />
                                            </div>

                                            {/* <div className="price-total">
                                                <div className="title-price">
                                                    <PopoverPrice detailPrice={detailPrice} />
                                                </div>
                                                <div className="real-price ">
                                                    {dataDetailHome.discount > 0 && (
                                                        <p className="root" style={{ fontWeight: '550' }}>
                                                            {formatPrice(totalBill)}
                                                        </p>
                                                    )}
                                                    <p style={{ fontWeight: '550' }}>
                                                        {formatPrice(totalBill * (1 - dataDetailHome?.discount / 100))}
                                                    </p>
                                                </div>
                                            </div> */}
                                            <div className="price__home">
                                                {dataDetailHome.discount > 0 && (
                                                    <div className="price__before-discount ">
                                                        <div className="title-price"></div>
                                                        <p className="price__home__root">{formatPrice(totalBill)}</p>
                                                    </div>
                                                )}
                                                <div className="real-price ">
                                                    <p className="title-price">{`${t('common.priceFor')} ${
                                                        dataDetailHome.accomCateName
                                                    } x ${dayGap({ start: dateBook[0], end: dateBook[1] })}`}</p>
                                                    <p>
                                                        {formatPrice(totalBill * (1 - dataDetailHome?.discount / 100))}
                                                    </p>
                                                </div>
                                            </div>
                                            <SurchargeList data={dataDetailHome?.surchargeList} />
                                            <div className="total-price">
                                                <div className="title-price">Tổng giá phòng</div>
                                                <div className="real-price ">
                                                    <p style={{ fontWeight: '550' }}>
                                                        {formatPrice(
                                                            totalBill * (1 - dataDetailHome?.discount / 100) +
                                                                dataDetailHome?.surchargeList.reduce(
                                                                    (sum, surcharge) => sum + surcharge.cost,
                                                                    0
                                                                )
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="btn-booking">
                                                <Button
                                                    variant="contained"
                                                    disabled={disBooking}
                                                    className="btn-booking-room"
                                                    onClick={handleBooking}
                                                >
                                                    {t('common.booking')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Button variant="contained" onClick={handleChat}>
                                Liên hệ chủ nhà
                            </Button>
                            <GoogleMap data={dataDetailHome} />

                            <CommentReview id={roomId.id} />
                        </div>
                        <DrawerHome open={openDrawer} setOpen={setOpenDrawer} data={dataDetailHome} stars={stars} />
                    </div>
                </>
            )}
        </FramePage>
    );
}
