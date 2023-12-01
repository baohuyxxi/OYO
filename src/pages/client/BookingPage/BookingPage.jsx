import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '~/assets/svg/logo.svg';
import FramePage from '~/components/FramePage/FramePage';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import convertPrice from '~/utils/convertPrice';
import formatPrice from '~/utils/formatPrice';
import { guests } from '~/utils/formatForm';
import { pricePay } from '~/utils/calculates';
import CheckBoxPaymentPolicy from '~/components/CheckBoxPayment/CheckBoxPaymentPolicy';
import CheckBoxPaymentMethod from '~/components/CheckBoxPayment/CheckBoxPaymentMethod';
import DateBooking from '~/components/DateBooking/DateBooking';
import Paypal from '~/components/Paypal/Paypal';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
import { useDispatch, useSelector } from 'react-redux';
import './BookingPage.scss';
import { t } from 'i18next';

const BookingPage = () => {
    const dispatch = useDispatch();
    const dataBooking = useSelector((state) => state.booking);
    const [loading, setLoading] = useState(true);
   
    const [dataDetailHomeBooking, setDataDetailHomeBooking] = useState();
    const [priceAfterChoosePayment, setPriceAfterChoosePayment] = useState(dataBooking?.priceTotal);
    const handleBookingRoom = () => {
        console.log(dataBooking);
    };
    useEffect(() => {
        setLoading(true);
        publicAccomPlaceAPI.getRoomDetail(dataBooking.accomId).then((dataResponse) => {
            setDataDetailHomeBooking(dataResponse.data);
            setLoading(false);
        });
    }, []);
    // pricePay(dataBooking)
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
                            <CheckBoxPaymentPolicy
                                setPriceAfterChoosePayment={setPriceAfterChoosePayment}
                                price={dataBooking?.priceTotal}
                            />
                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.method')}</p>
                                </div>
                            </div>
                            <CheckBoxPaymentMethod
                                setPriceAfterChoosePayment={setPriceAfterChoosePayment}
                                price={dataBooking?.priceTotal}
                            />
                            <div className="payment__paypal">
                                <Paypal
                                    pricePayment={priceAfterChoosePayment}
                                    booking={handleBookingRoom}
                                />
                            </div>
                        </div>
                        <div className="col l-4">
                            <div className="card-booking__room">
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
                                                    dataDetailHomeBooking?.ownerName
                                                }`}</p>
                                            </div>
                                        </div>
                                        <hr className="line-card" />
                                        <div className="policy-booking">{t('title.bookingOfYou.policy')}</div>

                                        <hr className="line-card" />
                                        <div className="card-surcharge">
                                            <p>{t('title.bookingOfYou.surcharges')}</p>
                                            <p>Phụ phí: {dataBooking.surcharge}</p>
                                            {/* {dataDetailHomeBooking?.surcharges?.map((sur, index: number) => (
                                    <li key={index}>{sur?.surchargeCategoryName}</li>
                                ))} */}
                                        </div>

                                        <div className="price-booking">
                                            <div className="price-room-booking">
                                                <p style={{ color: '#757575' }}>{t('title.bookingOfYou.price')}</p>
                                                <p style={{ fontWeight: '550' }}>
                                                    {formatPrice(dataDetailHomeBooking?.pricePerNight)}
                                                </p>
                                            </div>
                                            <div className="price-total-booking">
                                                <p style={{ color: '#757575' }}>{t('title.bookingOfYou.totalPrice')}</p>
                                                <p style={{ fontWeight: '550' }}>
                                                    {formatPrice(dataBooking?.priceTotal)}
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
