import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { NavLink, useNavigate } from 'react-router-dom';
import FramePage from '~/components/FramePage/FramePage';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import convertPrice from '~/utils/convertPrice';
import formatPrice from '~/utils/formatPrice';
import { guests } from '~/utils/formatForm';
import { pricePay, dayGap } from '~/utils/calculates';
import CheckBoxPaymentPolicy from '~/components/CheckBoxPayment/CheckBoxPaymentPolicy';
import CheckBoxPaymentMethod from '~/components/CheckBoxPayment/CheckBoxPaymentMethod';
import DateBooking from '~/components/DateBooking/DateBooking';
import Paypal from '~/components/Paypal/Paypal';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import bookingAPI from '~/services/apis/clientAPI/clientBookingAPI';
import { useDispatch, useSelector } from 'react-redux';
import './BookingPage.scss';
import { t } from 'i18next';
import { da } from 'date-fns/locale';
import bookingSlice from './bookingSlice';

const BookingPage = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dataBooking = useSelector((state) => state.booking);
    const [loading, setLoading] = useState(true);
    const [dataDetailHomeBooking, setDataDetailHomeBooking] = useState();
    const [priceAfterChoosePayment, setPriceAfterChoosePayment] = useState(dataBooking?.originPay);
    const handleBookingRoom = () => {
        bookingAPI.createBooking(dataBooking).then((dataResponse) => {
            enqueueSnackbar(t('message.bookingSuccess'), { variant: 'success' });
            dispatch(bookingSlice.actions.clearInfoBooking());
            navigate('/');
        });

    };
    useEffect(() => {
        setLoading(true);
        publicAccomPlaceAPI.getRoomDetail(dataBooking.accomId).then((dataResponse) => {
            setDataDetailHomeBooking(dataResponse.data);
            setLoading(false);
        });
    }, []);
    useEffect(() => {
        const dataCheck = {
            checkIn: dataBooking.checkIn,
            checkOut: dataBooking.checkOut,
            accomId: dataBooking.accomId,
            numAdult: dataBooking.numAdult
        };
        publicAccomPlaceAPI.checkBooking(dataCheck).then((response) => {
            if (response?.statusCode === 200) {
                dispatch(bookingSlice.actions.updateInfoBooking(response.data));
            } else {
            }
        });
    }, [dataBooking.checkIn, dataBooking.checkOut]);
    useEffect(() => {
        let result = dataBooking.originPay;
        if (dataBooking.paymentPolicy === 'PAYMENT_HALF') {
            result /= 2;
        }
        if (dataBooking.paymentMethod === 'PAYPAL') {
            result *= 0.9;
        }
        setPriceAfterChoosePayment(result);
        dispatch(bookingSlice.actions.addTotalTransfer(result));
    }, [dataBooking.paymentPolicy, dataBooking.paymentMethod, dataBooking.originPay]);
    return (
        <FramePage>
            <div className="booking__page">
                {/* Show review when booking success 
                {idBooking !== '' && idBooking !== undefined ? (
                <FormEvaluate showFormReview={true} idBook={idBooking} handleCloseReview={handleCloseReview} />
            ) : (
                <></>
            )} */}
                <div className="content-booking">
                    <h1>{t('title.bookingOfYou.tilte')}</h1>
                    <div className="row">
                        <div className="col l-8" style={{ height: '100vh', paddingRight: '50px' }}>
                            <h2>{t('title.bookingOfYou.drive')}</h2>
                            <DateBooking
                                size="horizontal"
                                checkIn={dataBooking.checkIn}
                                checkOut={dataBooking.checkOut}
                                idHome={dataBooking.accomId}
                                // handleChangePriceDay={handleChangePriceDay}
                            />
                            <hr className="line" />

                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.client')}</p>
                                    <p className="count">{guests(dataBooking)}</p>
                                </div>
                            </div>

                            <hr className="line" />
                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.payOnline')}</p>
                                    <p className="count">{`${t('title.bookingOfYou.payBefore')}: ${convertPrice(
                                        priceAfterChoosePayment
                                    )}`}</p>
                                </div>
                            </div>
                            <CheckBoxPaymentPolicy price={dataBooking?.priceTotal} />
                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.method')}</p>
                                </div>
                            </div>
                            <CheckBoxPaymentMethod price={dataBooking?.priceTotal} />
                            <div className="payment__paypal">
                                <Paypal pricePayment={priceAfterChoosePayment} booking={handleBookingRoom} />
                            </div>
                        </div>
                        <div className="col l-4">
                            <div className="card-booking__room paper">
                                {loading ? (
                                    <></>
                                ) : (
                                    <>
                                        <div className="header-room__booking">
                                            <div className="image-room__booking">
                                                <img src={dataDetailHomeBooking?.imageAccomsUrls[0]} alt="" />
                                            </div>
                                            <div className="desc-room__booking">
                                                <p className="desc-all">{t('title.bookingOfYou.fullHome')}</p>
                                                <p className="name-room-booking">
                                                    {dataDetailHomeBooking?.accomCateName}
                                                </p>
                                                <div className="locate-room-booking">
                                                    <FmdGoodIcon className="icon-locate-booking" />
                                                    <p>{dataDetailHomeBooking.addressDetail}</p>
                                                </div>
                                                <p className="name-host-room">{`${t('title.bookingOfYou.owner')} ${
                                                    dataDetailHomeBooking?.nameHost
                                                }`}</p>
                                            </div>
                                        </div>
                                        <hr className="line-card" />
                                        <div className="policy-booking">{t('title.bookingOfYou.policy')}</div>

                                        <hr className="line-card" />
                                        <div className="price-booking">
                                            <div className="price-room-booking">
                                                <p style={{ color: '#757575' }}>{t('title.bookingOfYou.price')}</p>
                                                <p style={{ fontWeight: '550' }}>
                                                    {formatPrice(dataBooking?.totalCostAccom)}/
                                                    {dayGap({ start: dataBooking.checkIn, end: dataBooking.checkOut })}{' '}
                                                    {t('title.bookingOfYou.day')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card-surcharge">
                                            <p>{t('title.bookingOfYou.surcharges')}: {dataBooking.surcharge}</p>
                                            {dataDetailHomeBooking?.surchargeList?.map((sur, index) => (
                                                <li key={index}>{sur?.surchargeName}</li>
                                            ))}
                                        </div>
                                        <div className="price-booking">
                                            <div className="price-total-booking">
                                                <p style={{ color: '#757575' }}>{dataBooking.paymentMethod==='DIRECT'? t('title.bookingOfYou.direct'): t('title.bookingOfYou.paypal')}</p>
                                                <p style={{ fontWeight: '550' }}>
                                                {dataBooking.paymentMethod==='DIRECT'? formatPrice(dataBooking?.originPay): formatPrice(dataBooking?.originPay*0.9)}
                                                   
                                                </p>
                                            </div>
                                        </div>
                                       
                                        {/* <button onClick={handleBookingRoom} className="btn-booking">
                                            Đặt phòng
                                        </button> */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FramePage>
    );
};

export default BookingPage;
