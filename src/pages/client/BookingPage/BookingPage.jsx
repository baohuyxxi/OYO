import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

import { NavLink, useNavigate } from 'react-router-dom';

import Logo from '~/assets/svg/logo.svg';
import FramePage from '~/components/FramePage/FramePage'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import convertDola from '~/utils/convertDola';
import formatPrice from '~/utils/formatPrice';
import CheckBoxPayment from '~/components/CheckBoxPayment/CheckBoxPayment';
import DateBooking from '~/components/DateBooking/DateBooking';
import Paypal from '~/components/Paypal/Paypal';
import { useDispatch, useSelector } from 'react-redux';
import './BookingPage.scss';
import { t } from 'i18next';

const BookingPage = () => {
    const dispatch = useDispatch();
    const dataBooking = useSelector(((state) => state.booking))
    console.log(dataBooking)
    const [infoBooking, setInfoBooking] = useState(dataBooking);
    const [dataDetailHomeBooking, setDataDetailHomeBooking] = useState(
        mockData.dataDetailHomeBooking
    );
    const [priceAfterChoosePayment, setPriceAfterChoosePayment] = useState(infoBooking?.priceTotal);
   
    const priceDay =1000

    const handleBookingRoom = () => {
        console.log(dataBooking)
        
    }
    useEffect(()=>{
        setPriceAfterChoosePayment(1000) 
    }, [])
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
                            checkIn={infoBooking.checkIn}
                            checkOut={infoBooking.checkOut}
                            idHome={infoBooking.accomId}
                            // handleChangePriceDay={handleChangePriceDay}
                        />
                            <hr className="line" />

                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.client')}</p>
                                    <p className="count">{infoBooking?.titleGuests}</p>
                                </div>
                            </div>

                            <hr className="line" />
                            <div className="count-customer">
                                <div>
                                    <p className="customer-count__title">{t('title.bookingOfYou.payOnline')}</p>
                                    <p className="count">{`${t('title.bookingOfYou.payBefore')}: ${convertDola(
                                        priceAfterChoosePayment,
                                    )} $`}</p>
                                </div>
                            </div>
                            <CheckBoxPayment
                                setPriceAfterChoosePayment={setPriceAfterChoosePayment}
                                price={infoBooking?.priceTotal}
                        />
                        <div className="payment__paypal">
                            <Paypal pricePayment={convertDola(priceAfterChoosePayment)} booking={handleBookingRoom} />
                        </div>
                        </div>
                        <div className="col l-4">
                            <div className="card-booking__room">
                                <div className="header-room__booking">
                                    <div className="image-room__booking">
                                        <img src={dataDetailHomeBooking?.thumbnail} alt="" />
                                    </div>
                                    <div className="desc-room__booking">
                                        <p className="desc-all">{t('title.bookingOfYou.fullHome')}</p>
                                        <p className="name-room-booking">{dataDetailHomeBooking?.name}</p>
                                        <div className="locate-room-booking">
                                            <FmdGoodIcon className="icon-locate-booking" />
                                            <p>{`${dataDetailHomeBooking?.addressDetail !== null
                                                    ? dataDetailHomeBooking?.addressDetail
                                                    : ''
                                                } ${dataDetailHomeBooking?.addressDetail !== null ? ',' : ''} ${dataDetailHomeBooking?.provinceName
                                                    ? dataDetailHomeBooking?.provinceName
                                                    : ''
                                                }`}</p>
                                        </div>
                                        <p className="name-host-room">{`${t('title.bookingOfYou.owner')} ${dataDetailHomeBooking?.ownerName
                                            }`}</p>
                                    </div>
                                </div>
                                <hr className="line-card" />
                                <div className="policy-booking">{t('title.bookingOfYou.policy')}</div>

                                <hr className="line-card" />
                                <div className="card-surcharge">
                                    <p>{t('title.bookingOfYou.surcharges')}</p>
                                    {/* {dataDetailHomeBooking?.surcharges?.map((sur, index: number) => (
                                    <li key={index}>{sur?.surchargeCategoryName}</li>
                                ))} */}
                                </div>

                                <div className="price-booking">
                                    <div className="price-room-booking">
                                        <p style={{ color: '#757575' }}>{t('title.bookingOfYou.price')}</p>
                                        <p style={{ fontWeight: '550' }}>
                                            {formatPrice(priceDay !== '' ? priceDay : infoBooking?.priceDay)}
                                        </p>
                                    </div>
                                    <div className="price-total-booking">
                                        <p style={{ color: '#757575' }}>{t('title.bookingOfYou.totalPrice')}</p>
                                        <p style={{ fontWeight: '550' }}>{formatPrice(infoBooking?.priceTotal)}</p>
                                    </div>
                                </div>
                                {/* <button onClick={handleBookingRoom} className="btn-booking">
                                Đặt phòng
                            </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FramePage>
    );
};

export default BookingPage;

const mockData = {
    infoBooking: {
        dateStart: '2023-01-01',
        dateEnd: '2023-01-05',
        homeId: 1,
        titleGuests: 2,
        priceTotal: 200,
    },
    dataDetailHomeBooking: {
        thumbnail: 'https://visaho.vn/upload_images/images/2022/04/01/dien-tich-can-ho-chung-cu-2-min.jpg',
        name: 'Mock Home Name',
        addressDetail: 'Mock Address',
        provinceName: 'Mock Province',
        ownerName: 'Mock Owner Name',
        surcharges: [
            { surchargeCategoryName: 'Surcharge 1' },
            { surchargeCategoryName: 'Surcharge 2' },
        ],
    },
    // Add other mock data as needed...
};
