import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import FramePage from '~/components/FramePage/FramePage';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import formatPrice from '~/utils/formatPrice';
import { guests } from '~/utils/formatForm';
import { pricePay, dayGap } from '~/utils/calculates';
import CheckBoxPaymentPolicy from '~/components/CheckBoxPayment/CheckBoxPaymentPolicy';
import CheckBoxPaymentMethod from '~/components/CheckBoxPayment/CheckBoxPaymentMethod';
import InfoUserBooking from '~/components/InfoUserBooking/InfoUserBooking';
import DateBooking from '~/components/DateBooking/DateBooking';
import Paypal from '~/components/Paypal/Paypal';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import bookingAPI from '~/services/apis/clientAPI/clientBookingAPI';
import { useDispatch, useSelector } from 'react-redux';
import { validateBooking } from '~/utils/validate';
import './BookingPage.scss';
import { t } from 'i18next';
import bookingSlice from '~/redux/bookingSlice';
import globalSlice from '~/redux/globalSlice';
import { transLateRoom } from '~/services/apis/translateAPI/translateAPI';
const BookingPage = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dataBooking = useSelector((state) => state.booking);
    const [loading, setLoading] = useState(true);
    const [dataDetailHomeBooking, setDataDetailHomeBooking] = useState();
    const [priceAfterChoosePayment, setPriceAfterChoosePayment] = useState(dataBooking?.originPay);
    const [errors, setErrors] = useState({});
    const [totalBill, setTotalBill] = useState(0);
    const handleBookingRoom = () => {
        const checkValidate = validateBooking(dataBooking);
        if (Object.keys(checkValidate).length === 0) {
            dispatch(globalSlice.actions.setLoading(true));
            bookingAPI.createBooking(dataBooking).then((dataResponse) => {
                enqueueSnackbar(t('message.bookingSuccess'), { variant: 'success' });
                dispatch(bookingSlice.actions.clearInfoBooking());
                dispatch(globalSlice.actions.setLoading(false));
                navigate('/');
            });
        } else {
            setErrors(checkValidate);
        }
    };
    useEffect(() => {
        setLoading(true);
        publicAccomPlaceAPI.getRoomDetail(dataBooking.accomId).then(async (dataResponse) => {
            const data = await transLateRoom(dataResponse.data);
            setDataDetailHomeBooking(data);
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
            dispatch(bookingSlice.actions.updateInfoBooking(response.data));
        });
    }, [dataBooking.checkIn, dataBooking.checkOut]);
    useEffect(() => {
        let result = dataBooking.originPay;
        let total = dataBooking.originPay;
        if (dataBooking.paymentPolicy === 'PAYMENT_HALF') {
            result /= 2;
            total *= 0.5;
        }
        if (dataBooking.paymentMethod === 'PAYPAL') {
            result *= 0.9;
            total *= 0.9;
        } else {
            result = 0;
        }
        result *= 1 - dataBooking.discount / 100;
        total *= 1 - dataBooking.discount / 100;
        setTotalBill(total);
        setPriceAfterChoosePayment(result);
        dispatch(bookingSlice.actions.addTotalTransfer(result));
    }, [dataBooking.paymentPolicy, dataBooking.paymentMethod, dataBooking.originPay]);

    return (
        <FramePage>
            <div className="booking__page content">
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
                            />
                            {dataBooking.canBooking === false && <p className="error">{t('common.candontBooking')}</p>}
                            <hr className="line" />

                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.client')}</p>
                                    <p className="count">{guests(dataBooking)}</p>
                                </div>
                            </div>
                            <InfoUserBooking />
                            {errors?.phoneNumberCustomer && <p className="error">{errors.phoneNumberCustomer}</p>}
                            <hr className="line" />
                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.payOnline')}</p>
                                    <p className="count">{`${t('title.bookingOfYou.payBefore')}: ${formatPrice(
                                        priceAfterChoosePayment
                                    )}`}</p>
                                </div>
                            </div>
                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.method')}</p>
                                </div>
                            </div>
                            <CheckBoxPaymentMethod price={dataBooking?.priceTotal} />
                            {/* <CheckBoxPaymentPolicy price={dataBooking?.priceTotal} /> */}

                            {dataBooking.paymentMethod === 'PAYPAL' ? (
                                <div className="payment__paypal">
                                    <Paypal
                                        pricePayment={priceAfterChoosePayment}
                                        booking={handleBookingRoom}
                                        canBooking={dataBooking.canBooking}
                                    />
                                </div>
                            ) : (
                                <div className="btn__booking">
                                    <button disabled={!dataBooking.canBooking} onClick={handleBookingRoom}>
                                        {t('common.booking')}
                                    </button>
                                </div>
                            )}
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
                                            <p>
                                                {t('title.bookingOfYou.surcharges')}: {dataBooking.surcharge}
                                            </p>
                                            {dataDetailHomeBooking?.surchargeList?.map((sur, index) => (
                                                <li key={index}>
                                                    {sur?.surchargeName}: {formatPrice(sur.cost)}
                                                </li>
                                            ))}
                                        </div>
                                        <div className="price-booking">
                                            {dataBooking.discount !== 0 && (
                                                <div className="price-total-booking">
                                                    <p style={{ color: '#757575' }}>
                                                        {t('common.discountFrom')} {dataDetailHomeBooking.accomCateName}
                                                    </p>
                                                    <p style={{ fontWeight: '300' }}>
                                                        {`-` +
                                                            formatPrice(
                                                                (dataBooking?.originPay * dataBooking.discount) / 100
                                                            )}
                                                    </p>
                                                </div>
                                            )}
                                            <div className="price-total-booking">
                                                <p style={{ color: '#757575' }}>
                                                    {dataBooking.paymentMethod === 'DIRECT'
                                                        ? t('title.bookingOfYou.direct')
                                                        : t('title.bookingOfYou.paypal')}
                                                </p>
                                                <p style={{ fontWeight: '300' }}>
                                                    {dataBooking.paymentMethod === 'DIRECT'
                                                        ?  `-` + formatPrice(0)
                                                        : `-` + formatPrice((dataBooking?.originPay * (100 -dataBooking.discount)) / 100 * 0.1)}
                                                </p>
                                            </div>

                                            <div className="price-total-booking">
                                                <p style={{ color: '#757575' }}>
                                                    {t('title.bookingOfYou.totalPrice')}
                                                </p>
                                                <p style={{ fontWeight: '550' }}>
                                                  {formatPrice(totalBill)} 
                                                </p>
                                            </div>
                                        </div>
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
