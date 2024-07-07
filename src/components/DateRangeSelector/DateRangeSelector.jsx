import './DateRangeSelector.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { enGB } from 'date-fns/locale';
import { DateRangePicker } from 'react-nice-dates';
import moment from 'moment';
import 'react-nice-dates/build/style.css';

export default function DateRangeSelector({ dateBook, setDataDay }) {
    console.log(dateBook);
    // console.log(dateBook);
    // const dataBooking = useSelector((state) => state.booking.info);
    // const [startDate, setStartDate] = useState(moment(dateBook[0], 'DD/MM/yyyy').toDate());
    // const [endDate, setEndDate] = useState(moment(dateBook[1], 'DD/MM/yyyy').toDate());

    // console.log(startDate, endDate);

    // useEffect(() => {
    //     setStartDate(moment(dateBook[0], 'DD/MM/yyyy').toDate());
    //     setEndDate(moment(dateBook[1], 'DD/MM/yyyy').toDate());
    // }, [dataBooking.checkIn, dataBooking.checkOut]);

    // useEffect(() => {
    //     if (startDate && endDate) {
    //         setDataDay(startDate, endDate);
    //     }
    // }, [startDate, endDate]);
    return (
        <div className="date-range-selector">
            {/* <DateRangePicker
                startDate={startDate || new Date()}
                endDate={endDate || addDays(new Date(), 1)}
                onStartDateChange={(e) => {
                    setStartDate(e);
                }}
                onEndDateChange={setEndDate}
                minimumDate={new Date()}
                format="dd/MM/yyyy"
                locale={enGB}
            >
                {({ startDateInputProps, endDateInputProps, focus }) => (
                    <div className="info_date">
                        <div className="checkin">
                            <div className="title__checkin">{t('contentMain.fromDay')}</div>
                            <input
                                className="date__checkin"
                                {...startDateInputProps}
                                placeholder={dataBooking.checkIn}
                            />
                            <ExpandMoreIcon className="icon__expand" />
                        </div>
                        <div className="checkout">
                            <div className="title__checkout">{t('contentMain.toDay')}</div>
                            <input
                                className="date__checkout"
                                {...endDateInputProps}
                                placeholder={dataBooking.checkOut}
                            />
                            <ExpandMoreIcon className="icon__expand" />
                        </div>
                    </div>
                )}
            </DateRangePicker> */}
            <DateRangePicker
                startDate={moment(dateBook[0], 'DD/MM/yyyy').toDate()}
                endDate={moment(dateBook[1], 'DD/MM/yyyy').toDate()}
                onStartDateChange={(e) => {
                    if (e) {
                        setDataDay(moment(e, 'DD/MM/yyyy').toDate(), moment(dateBook[1], 'DD/MM/yyyy').toDate());
                    }
                }}
                onEndDateChange={(e) => {
                    if (e) {
                        setDataDay(moment(dateBook[0], 'DD/MM/yyyy').toDate(), moment(e, 'DD/MM/yyyy').toDate());
                    }
                }}
                minimumDate={new Date()}
                format="dd/MM/yyyy"
                locale={enGB}
            >
                {({ startDateInputProps, endDateInputProps, focus }) => (
                    <div className="info_date">
                        <div className="checkin">
                            <div className="title__checkin">{t('contentMain.fromDay')}</div>
                            <input className="date__checkin" {...startDateInputProps} placeholder={dateBook[0]} />
                            <ExpandMoreIcon className="icon__expand" />
                        </div>
                        <div className="checkout">
                            <div className="title__checkout">{t('contentMain.toDay')}</div>
                            <input className="date__checkout" {...endDateInputProps} placeholder={dateBook[1]} />
                            <ExpandMoreIcon className="icon__expand" />
                        </div>
                    </div>
                )}
            </DateRangePicker>
        </div>
    );
}
