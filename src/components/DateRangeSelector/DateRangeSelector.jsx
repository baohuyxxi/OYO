import './DateRangeSelector.scss';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
// import { Calendar } from './Calendar';
export default function DateRangeSelector() {
    const dataBooking = useSelector((state) => state.booking);


    return (
        <div className="date-range-selector">
            <div className="info_date">
                <div className="checkin">
                    <div className="title__checkin">Nhận phòng</div>
                    <div className="date__checkin">{dataBooking?.checkIn}</div>
                    <ExpandMoreIcon className="icon__expand" />
                </div>
                <div className="checkout">
                    <div className="title__checkout">Trả phòng</div>
                    <div className="date__checkout">{dataBooking?.checkOut}</div>
                    <ExpandMoreIcon className="icon__expand" />
                </div>
            </div>
            {/* <Calendar
                initialRangeValuesProps={selectedRange}
                onRangeChange={(e) => setSelectedRange(e)}
                setOnRangeDateInScreen={(e) => setInitialMonthAndYear(e.start)}
            /> */}
        </div>
    );
}
